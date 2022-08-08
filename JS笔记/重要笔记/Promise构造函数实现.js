/**
 * 1、先收集 then 回调，再执行构造函数
 * 2、then 返回的还是 Promise 实例
 * @param {Function} executor 
 */
 function FakePromise(executor) {
  this.status = 'pending';
  this.data = undefined;
  this.onResolvedCallbacks = [];
  this.onRejectedCallbacks = [];
  try {
    executor(this.resolve.bind(this), this.reject.bind(this));
  } catch (error) {
    throw error;
  }
}

/** then 不返回 this 返回 FakePromise 实例: 取决于后一个 promise 返回的值
 *  例: 如若 promise1 返回 resolved, then 还返回 this 的话，则整体返回 resolved，实际是 rejected
 *  promise2 = promise1.then(function foo(value) {
 *   return Promise.reject(3)
 *  })
 */
FakePromise.prototype.then = function (onResolvedCallback, onRejectedCallback) {
  onResolvedCallback = typeof onResolvedCallback === 'function' ? onResolvedCallback : function(value) { return value; };
  onRejectedCallback = typeof onRejectedCallback === 'function' ? onRejectedCallback : function(reason) { throw reason; };

  const _this = this;
  const collectResolve = function(resolve, reject) {
    try {
      const onResolvedCallbackRes = onResolvedCallback(_this.data);
      if (onResolvedCallbackRes instanceof FakePromise) {
        onResolvedCallbackRes.then(resolve, reject)
      } else {
        resolve(onResolvedCallbackRes);
      }
    } catch (error) {
      reject(error);
    }
  }
  const collectReject = function(resolve, reject) {
    try {
      const onRejectedCallbackRes = onRejectedCallback(_this.data);
      if (onRejectedCallbackRes instanceof FakePromise) {
        onRejectedCallbackRes.then(resolve, reject)
      } else {
        resolve(onResolvedCallbackRes);
      }
    } catch (error) {
      reject(error);
    }
  }
  return new FakePromise(function(resolve, reject) {
    if (_this.status === 'pending') {
      _this.onResolvedCallbacks.push(() => collectResolve(resolve, reject));
      _this.onRejectedCallbacks.push(() => collectReject(resolve, reject));
    }
    if (_this.status === 'resolved')  collectResolve(resolve, reject);
    if (_this.status === 'rejected') collectReject(resolve, reject);
  });
}

FakePromise.prototype.resolve = function (value) {
  /** setTimeout 的目的是为了先执行 then 收集回调函数*/
  setTimeout(function () {
    if (this.status === 'pending') {
      this.data = value;
      this.status = 'resolved';
      for (let i = 0, len = this.onResolvedCallbacks.length; i < len; i++) {
        this.onResolvedCallbacks[i](value);
      }
    }
  }.bind(this), 0);
}                                                                                     

FakePromise.prototype.reject = function (value) {
  /** setTimeout 的目的是为了先执行 then 收集回调函数 */
  setTimeout(function () {
    if (this.status === 'pending') {
      this.data = value;
      this.status = 'rejected';
      for (let i = 0, len = this.onRejectedCallbacks.length; i < len; i++) {
        this.onRejectedCallbacks[i](value);
      }
    }
  }.bind(this), 0);
}

FakePromise.prototype.catch = function (onRejectedCallback) {
  return this.then(null, onRejectedCallback);
}

FakePromise.prototype.finally = function (fn) {
  return this.then(function(value) {
    fn(value);
    return value;
  }, function(reason) {
    fn(value);
    return reason;
  });
}

FakePromise.resolve = function(value) {
  return new FakePromise(function(resolve) {
    resolve(value);
  });
}
FakePromise.reject = function(value) {
  return new FakePromise(function(resolve, reject) {
    reject(value);
  });
}
FakePromise.all = function(promises) {
  return new FakePromise(function(resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      promises[i].then(function(value) {
        return resolve(value);
      }, function(error) {
        return reject(error);
      });
    }
  });
}
FakePromise.all = function(promises) {
  return new FakePromise(function(resolve, reject) {
    let [count, resolvedValues] = [0, []];
    for (var i = 0; i < promises.length - 1; i++) {
      promises[i].then(function(value) {
        resolvedValues[i] = value;
        if (++count === promises.length) return resolve(resolvedValues);
      }, function(error) {
        return reject(error);
      });
    }
  });
}

/** 测试 then */
var promise1 = new FakePromise((resolve, reject) => { // promise1 { data: 'hello world1', status: 'resolved' }
  resolve('hello world');
}).then(function(res) {
  console.log(res);
  return new FakePromise((resolve, reject) => {
    resolve('hello world1');
  });
});
var promise2 = promise1.then(function(res) { // promise2 { data: undefined, status: 'resolved' }
  console.log(res);
  return new FakePromise((resolve, reject) => {
    resolve('hello world2');
  });
}).then(function(res) {
  console.log(res);
});

/** 测试 catch */
var promise3 = new FakePromise(function (resolve, reject) {
  reject('222');
}).catch(function(err) {
  console.log(err);
});

/** 测试 finally */
var promise4 = new FakePromise(function(resolve, reject) {
  resolve('resolve: 1');
}).finally(function(res) {
  console.log('resolve时会打印', res);
});
