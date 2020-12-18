/**
 * 参考地址：https://github.com/xieranmaya/blog/issues/3
 */
class PromiseNew {
	/*resolver为 function(resolve, reject){ ... }：主要是写resolve函数和reject函数*/
  constructor(executor) {
  	// 初始状态为pending
    this.status = 'pending';
    // Promise的值
    this.data = undefined;
    // then成功回调注册函数
    this.onResolvedCallback = [];
    // then失败回调注册函数
    this.onRejectedCallback = [];
    /*考虑到执行executor的过程中有可能出错，所以用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise*/
    try {
      /*executor是形参 -> 实例PromiseNew的时候会执行executor的参数 -> 执行内部resolve方法*/
      executor(this.resolve.bind(this), this.reject.bind(this)) 
    } catch(e) {
      // 如果 resolve 或者 reject 执行错误，直接抛出异常，不能正常实例 PromiseNew
      throw(e);
      // this.reject(e)
    }
  }

  /*内部resolve函数:
    1、更新status为resolved
    2、设置当前Promise的值
    3、执行收集的回调
  */
  resolve(value) {
    setTimeout(function() {
      let self = this;
      if (self.status === 'pending') {
        self.status = 'resolved';
        self.data = value;
        // 这里面实际是收集了then函数中的回调
        for(let i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    }.bind(this));
  }

  /*内部resolve函数:
    1、更新status为rejected
    2、设置当前Promise的值
    3、执行收集的回调
  */
  reject(reason) {
    setTimeout(function() {
      let self = this;
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.data = reason;
        // 用 onRejectedCallback 数组的长度判断（此回调执行的时候会走 catch 代码的 reject，而这个 reject 的 PromiseNew 的 onRejectedCallback 数组为空）
        if (self.onRejectedCallback.length === 0) {
          console.error(reason)
        }
        for(var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    }.bind(this));
  }

  /*返回PromiseNew对象：1、执行 onResolved 或者 2、执行onRejected 或者 3、收集 onResolved&onRejected
    注意：
    一、then必须返回PromiseNew对象，而不是this
      promise2 = promise1.then(function foo(value) {
        return Promise.reject(3)
      })
      假如foo执行的话 -> 代表promise1是resolved
      如果then返回this，即promise1，那么promise2不可能再执行Promise.reject(3)将自身状态改为rejected
    
    二、根据 promise1 的状态确定：执行 onResolved 或者 执行onRejected 或者 收集 onResolved&onRejected
      promise2 = promise1.then(function(value) {
        return 4
      }, function(reason) {
        throw new Error('sth went wrong')
      })
      如果 promise1 被 resolve 了，此时 promise1 状态为 resolved ， promise2 将被 4 resolve
      如果 promise1 被 reject  了，此时 promise1 状态为 rejected ， promise2 将被 new Error('sth went wrong') reject

      所以，我们需要在 then 里面执行 onResolved 或者 onRejected ，并根据返回值 x 来确定 promise2 的结果
      并且，如果 onResolved/onRejected 返回的是一个 Promise ，promise2 将直接取这个 Promise 的结果。
  */
  then(onResolved, onRejected) {
  	let self = this;
    let promise2;

    // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
    onResolved = typeof onResolved === 'function' ? onResolved : function(value) { return value; };
    onRejected = typeof onRejected === 'function' ? onRejected : function(reason) { throw reason; };

    if (self.status === 'resolved') {
      // 返回新的PromiseNew实例：状态取决于 onResolved 执行结果
      return promise2 = new PromiseNew(function(resolve, reject) {
        setTimeout(function() {
          // 因为考虑到 onResolved 函数有可能 throw ，所以将代码放在 try/catch 中
          try {
            /*如果 promise1 的状态确定是resolved，则执行 onResolved，onResolved 执行的结果为 x */
            let x = onResolved(self.data);
            if (x instanceof PromiseNew) {
              x.then(resolve, reject);
            } else {
              resolve(x);
            } 
          } catch (e) {
            // 给promise2改状态以及赋值: self.status = 'rejected'; self.data = e;
            reject(e);
          }
        }.bind(self));
      });
    }

    if (self.status === 'rejected') {
      // 返回新的PromiseNew实例：状态取决于 onRejected 执行结果
      return promise2 = new PromiseNew(function(resolve, reject) {
        setTimeout(function() {
          try {
            let x = onRejected(self.data);
            if (x instanceof PromiseNew) {
              x.then(resolve, reject);
            } else {
              resolve(x);  
            }
          } catch (e) {
            reject(e);
          }
        }.bind(self));
      });
    }

    // 状态 pending ，不明确该执行 onResolved/onRejected，所以先收集
    if (self.status === 'pending') {
      // 返回新的 PromiseNew 实例：状态是 pending（因为 resolve 或 reject 暂未执行）
      return promise2 = new PromiseNew(function(resolve, reject) {
        // 将 onResolved 存入 onResolvedCallback 数组中(存入的是包装后的 onResolved 函数执行结果)
        self.onResolvedCallback.push(function(value) {
          try {
            let x = onResolved(self.data);
            if (x instanceof PromiseNew) {
              x.then(resolve, reject);
            } else {
              resolve(x);
            }
          } catch (e) {
            reject(e);
          }
        });
        // 将 onRejected 存入 onRejectedCallback 数组中(存入的是包装后的 onRejected 函数执行结果)
        self.onRejectedCallback.push(function(reason) {
          try {
            let x = onRejected(self.data);
            if (x instanceof PromiseNew) {
              x.then(resolve, reject);
            } else {
              resolve(x);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  }

  /*捕获异常：等价于 then 方法
    1、catch捕获 executor 中的 reject 数据
    2、catch捕获 then 中语法错误（此报错打印字符串形式）

    注意：then中语法错误也可以不用catch捕获，默认通过 onRejectedCallback 数组的长度捕获（此报错 console.error 形式）
  */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /*jQuery 的 $.Deferred() 文档：http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html
    jQuery 的 $.Deferred() 对象上有与改变执行状态无关的方法（比如 done() 方法和 fail() 方法）、与改变执行状态有关的方法（比如 resolve() 方法和 reject() 方法）
    而 $.Deferred().promise() 上只开放与改变执行状态无关的方法（比如 done() 方法和 fail() 方法）
   */
  deferred() {
    let dfd = {}
    dfd.promise = new PromiseNew(function(resolve, reject) {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }

  /*停止 PromiseNew 后续的链
    场景：假如发生大的错误，让后续的链不再执行
    原理：返回一个 PromiseNew 对象，但是其 status 为 pending， 则后续的 then 或者 catch 的回调不会执行，只会收集 
   */
  stop() {
    return new PromiseNew(function() {});
  }

  /*最终方法：等价于 then 方法
    1、then 正常调用 onResolved（默认值） 或者 onRejected（默认值）
    2、fn 异步最后执行
   */
  finally(fn) {
    // value是形参，reason也是形参
    return this.then(function(value) {
      setTimeout(fn);
      return value;
    }, function(reason) {
      setTimeout(fn);
      return reason;
    });
  }
}
/*all方法：返回新的 PromiseNew 对象
  1、所有 promises 都 resolved ，则执行此 PromiseNew 的 resolve 方法，通过 then 方法可以获取传递 promises 的执行结果数组
  2、某个 promise  为 rejected ，则执行此 PromiseNew 的 reject  方法，此 PromiseNew 的结果即为当前 reject 的 promise 的值
*/
PromiseNew.all = function(promises) {
  // 返回新的 PromiseNew 对象
  return new PromiseNew(function(resolve, reject) {
    if (Object.prototype.toString.call(promises) === '[object Array]') {
      // 已经执行的 promise
      let resolvedCounter = 0;
      // promises 参数也是数组形式
      let promiseNum = promises.length;
      // 返回值是数组形式
      let resolvedValues = new Array(promiseNum);
      for (let i = 0; i < promiseNum; i++) {
        promises[i].then(function(value) {
          resolvedCounter++;
          resolvedValues[i] = value;
          // 已经执行的 promise 与 总得 promises 数量相等的时候
          if (resolvedCounter == promiseNum) {
            // 当前 PromiseNew 状态为 resolved
            return resolve(resolvedValues);
          }
        }, function(reason) {
          // 当前 PromiseNew 状态为 rejected
          return reject(reason);
        });
      }
    } else {
      reject('Uncaught (in promise) TypeError: #<PromiseNew> is not iterable');
    }
  })
}
/*race方法：返回新的 PromiseNew 对象
  1、某个 promise 为 resolved ，则执行此 PromiseNew 的 resolve 方法，此 PromiseNew 的结果取当前 resolve 的 promise 的值
  2、某个 promise 为 rejected ，则执行此 PromiseNew 的 reject  方法，此 PromiseNew 的结果取当前 reject  的 promise 的值
*/
PromiseNew.race = function(promises) {
  return new PromiseNew(function(resolve, reject) {
    if (Object.prototype.toString.call(promises) === '[object Array]') {
      // 同步执行所有 promises ，但是每个 promise 内部都是异步执行的
      // 相当于所有异步 promise 同时开始执行，看谁先完成
      for (var i = 0; i < promises.length; i++) {
        promises[i].then(function(value) {
          return resolve(value);
        }, function(reason) {
          return reject(reason);
        });
      }
    } else {
      reject('Uncaught (in promise) TypeError: #<PromiseNew> is not iterable');
    }
  })
}
/*返回一个 resolve 的 PromiseNew 对象：
  1、参数不为 PromiseNew 对象，返回 对象 value 为此 value
  2、参数  为 PromiseNew 对象，返回 对象 value 为此 PromiseNew 对象的 value
 */
PromiseNew.resolve = function(value) {
  return new PromiseNew(function(resolve, reject) {
    if (value instanceof PromiseNew) {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  })
}
/*返回一个 reject 的 PromiseNew 对象
 */
PromiseNew.reject = function(reason) {
  return new PromiseNew(function(resolve, reject) {
    reject(reason);
  })
}




/*连续执行测试：同步resolve*/
let promise1 = new PromiseNew((resolve, reject) => {
  resolve('hello world');
}).then(function(res) {
  console.log(res);
  return new PromiseNew((resolve, reject) => {
    resolve('hello world1');
  });
}).then(function(res) {
  console.log(res);
}); // promise1: { data: undefined, status: 'resolved' } // 因为then中没有return
/*连续执行测试：异步resolve*/
let promise2 = new PromiseNew((resolve, reject) => {
  setTimeout(function() {
    resolve('hello world');
  }, 0);
}).then(function(res) { 
  console.log(res);
  return new PromiseNew((resolve, reject) => {
    resolve('hello world1');
  });
}).then(function(res) {
  console.log(res);
});


/*分开执行测试：同步resolve*/
let promise3 = new PromiseNew((resolve, reject) => { // 实例new PromiseNew -> 会执行executor函数 -> 执行内部resolve函数
  resolve('hello world');
});
let promise4 = promise3.then(function(res) { // 执行promise3.then函数 -> 判断promise3的状态 -> 立即执行onResolved函数 或者 收集onResolved
  console.log(res);
  return new PromiseNew((resolve, reject) => {
    resolve('hello world1');
  });
});
let promise5 = promise4.then(function(res) {
  console.log(res);
});
/*分开执行测试：异步resolve*/
let promise6 = new PromiseNew((resolve, reject) => { // 实例new PromiseNew -> 会执行executor函数 -> 执行内部resolve函数
  setTimeout(function() {
    resolve('hello world');
  }, 0);
});
let promise7 = promise6.then(function(res) { // 执行promise3.then函数 -> 判断promise3的状态 -> 立即执行onResolved函数 或者 收集onResolved
  console.log(res);
  return new PromiseNew((resolve, reject) => {
    setTimeout(function() {
      resolve('hello world1');
    }, 0);
  });
});
let promise8 = promise7.then(function(res) {
  console.log(res);
});


/*测试 PromiseNew 的 deferred 方法*/
let a = new PromiseNew(function () {});
let b = a.deferred();
console.log(b);
b.reject('1111'); // deferred在外部直接可以改变其自身 promise 的状态
let c = b.promise.then(null, function(res) {console.log(res); return '2222'}); // c是一个新的 PromiseNew 对象了
console.log(c);


/*测试 PromiseNew 的 最后一条then链上的错误捕获*/
let d = new PromiseNew(function (resolve, reject) {
  reject('222');
}).catch(function(err) { // 1、catch捕获 executor 中的 reject 数据 
  console.log(err);
});
let e = new PromiseNew(function(resolve) {
  resolve(42);
}).then(function(value) {
  alter(value);
}).catch(function(value) { // 2、catch捕获 then 中语法错误（此报错打印字符串形式）
  console.log(value);
});
let f = new PromiseNew(function(resolve) {
  resolve(42);
}).then(function(value) { // 3、then 中语法错误：用 onRejectedCallback 数组的长度判断（此报错 console.error 形式）
  alter(value);
});
let g = new PromiseNew(function(resolve, reject) { // 与上述 3 类似
  reject(3);
})// promise1
.then() // returns promise2
.then() // returns promise3      
.then(); // returns promise4


/*测试 PromiseNew 的 stop 方法*/
let h = new PromiseNew(function(resolve, reject) {
  resolve(42);
})
.then(function(value) {
  // "Big ERROR!!!"
  return PromiseNew.stop()
})
.catch()
.then(function() {
  alert(11111);
})
.then(function() {
  alert(11111);
})
.catch()
.then(function() {
  alert(11111);
});


/*测试 PromiseNew 的 finally 方法*/
let i = new PromiseNew(function(resolve, reject) { resolve('resolve: 1'); })
.then()
.finally(function(res) { console.log('resolve时会打印', res); }) // finally 的回调是异步，最后执行，所以不会打印 res 的值
.then();
let j = new PromiseNew(function(resolve, reject) { reject('reject: 1'); })
.then()
.finally(function(res) { console.log('reject 时会打印', res); }) // finally 的回调是异步，最后执行，所以不会打印 res 的值
.then();


/*测试 PromiseNew 的 all 静态方法方法*/
let k = new PromiseNew(function(resolve, reject) { setTimeout(function() { resolve(1); }, 2000); });
let l = new PromiseNew(function(resolve, reject) { resolve(2); });
let m = new PromiseNew(function(resolve, reject) { resolve(3); });
let n = PromiseNew.all([k, l, m]).then(function(res) { console.log('同时完成：', res); }) // 同时完成：[1, 2, 3] 


/*测试 PromiseNew 的 race 静态方法方法*/
let o = new PromiseNew(function(resolve, reject) { setTimeout(function() { resolve(1); }, 3000); });
let p = new PromiseNew(function(resolve, reject) { setTimeout(function() { resolve(2); }, 2000); });
let q = new PromiseNew(function(resolve, reject) { setTimeout(function() { resolve(3); }, 1000); });
let i = PromiseNew.race([o, p, q]).then(function(res) { console.log('率先完成：', res); }) // 率先完成：3


/*测试 PromiseNew 的 resolve、reject 静态方法方法*/
let j = new PromiseNew(function(resolve, reject) { resolve('resolve'); });
let k = new PromiseNew(function(resolve, reject) { reject('reject'); });
let l = PromiseNew.resolve(j); // value: resolve
let m = PromiseNew.resolve(k); // value: reject
let n = PromiseNew.resolve(2); // value: 2
let o = PromiseNew.reject(j); // value: j
let p = PromiseNew.reject(k); // value: k
let q = PromiseNew.reject(2); // value: 2
