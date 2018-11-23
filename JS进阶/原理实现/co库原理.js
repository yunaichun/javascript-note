/**参考：https://github.com/tj/co/blob/master/index.js
 * [co co库自动执行 Generator 函数]
 * @param  {[type]} gen [ Generator 函数]
 * @return {[type]}     [description]
 */
function co(gen) {
    let ctx = this;
    // 返回 Promise 对象
    return new Promise(function(resolve, reject) {
  	    // 执行遍历器函数，得到遍历器对象
  	    if (typeof gen === 'function') gen = gen.call(ctx);
  	    // 执行遍历器函数，得到的不是遍历器对象，将 Promise 对象的状态改为 resolved 。
     	if (!gen || typeof gen.next !== 'function') return resolve(gen);
	  	// 初始化入口函数，第一次调用
	    onFulfilled();
	    // 成功状态下的回调
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
     	// 递归调用【onFulefilled -> next：主要是为了能够捕捉抛出的错误】
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