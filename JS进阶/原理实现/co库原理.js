let slice = Array.prototype.slice;

/**参考：https://github.com/tj/co/blob/master/index.js
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} Generator fn
 * @return {Promise}
 * @api public
 */
function co(gen) {
    let ctx = this;
    // 返回 Promise 对象
    return new Promise(function(resolve, reject) {
  	    // 执行遍历器函数，得到遍历器对象
  	    if (typeof gen === 'function') gen = gen.call(ctx);
  	    // 保证传入的值是遍历器函数
     	if (!gen || typeof gen.next !== 'function') return resolve(gen);

	  	// Generator自动控制流程：对 next 函数做了一层包装，为了捕获异常
	    onFulfilled();
	    /**
	     * @param {Mixed} res
	     * @return {Promise}
	     * @api private
	     */
	    function onFulfilled(res) {
	        let ret;
	        try {
	            // 获取第一个 yield 返回值【包含 done 和 value 属性】
	            ret = gen.next(res);
	        } catch (e) {
	            return reject(e);
	        }
	        //开启调用链
	        next(ret);
	    }
	    /**
	     * @param {Error} err
	     * @return {Promise}
	     * @api private
	     */
	    function onRejected(err) {
	        let ret;
	        try {
	            // 抛出错误，这边使用 generator 对象 throw 。这个的好处是可以在 co 的 generator Function里面使用 try 捕获到这个异常。
	            ret = gen.throw(err);
	        } catch (e) {
	            return reject(e);
	        }
	        next(ret);
	    }
     	/**
	     * Get the next value in the generator,
	     * return a promise.
	     *
	     * @param {Object} ret
	     * @return {Promise}
	     * @api private
	     */
	    function next(ret) {
			// 检查 Generator 函数是否执行到最后一步
		    if (ret.done) return resolve(ret.value);
		    // 确保每一步的返回值，是 Promise 对象。【Promise、Thunk、Generator、Array、Object】
		    let value = toPromise.call(ctx, ret.value);
		    // 使用 then 方法，为返回值加上回调函数，然后通过 onFulfilled 函数再次调用 next 函数。
		    if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
		    // 在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为 rejected，从而终止执行。
		    return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
		        + 'but the following object was passed: "' + String(ret.value) + '"'));
		    }
		}
	});
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */
function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj; // 是Promise
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj); // 是Generator
  if ('function' == typeof obj) return thunkToPromise.call(this, obj); // 是 Thunk 函数
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj); // 是数组
  if (isObject(obj)) return objectToPromise.call(this, obj); // 是对象
  return obj;
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator function.（检验是否是遍历器函数）
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  // Generator 函数的 constructor 等于 GeneratorFunction ，普通函数的 constructor 等于 Function
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

/**
 * Check if `obj` is a generator.（检验是否是遍历器对象）
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGenerator(obj) {
  // 遍历器对象 GeneratorFunction {}，不同于普通的 Object 对象
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */
function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */
function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this)); // 将数组的每一项依次转为 promise
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */
function objectToPromise(obj){
  var results = new obj.constructor(); // 定义一个 Object
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]); // 将对象的每一项依次转为 promise
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function () {
    return results; // 执行所有 promise，返回每一项的 promise 结果【如果某一项不是promise，就返回其本身的值】
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}




// 测试一：co 库返回一个 Promise 对象，可以实现链式调用
co(function* () {
  let result = yield Promise.resolve(true);
  return result;
}).then(function (value) {
  console.log(value);
}, function (err) {
  console.error(err.stack);
});


// 测试二：并发操作（数组的写法）
co(function* () {
  let res = yield [
    Promise.resolve(1),
    Promise.resolve(2)
  ];
  console.log(res); 
}).catch(onerror);
// 测试二：并发操作（对象的写法）
co(function* () {
  let res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res); 
}).catch(onerror);