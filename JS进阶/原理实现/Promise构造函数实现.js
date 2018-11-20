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
              /*如果 onResolved 执行的结果是一个 PromiseNew 对象：给 promise2 改状态以及赋值（与x相等）
                1、执行此 x 对象 then 方法上的 onResolved -> 实际是执行 promise2 的 resolve 方法 ->  resolve 的参数是 x 的值，则会将 promise2 的值设置为 x 的值（状态与x一致）
                2、执行此 x 对象 then 方法上的 onRejected -> 实际是执行 promise2 的 reject  方法 ->  reject 的参数是 x 的值， 则会将 promise2 的值设置为 x 的值（状态与x一致）
              */
              // x.then(resolve, reject); // 执行 x 的 then 方法 -> 执行 x 的 onResolved  或者 onRejected -> 执行 promise2 的 resolve 或者 reject
              // 等价于
              if (x.status === 'resolved') {
                resolve(x.data);
              } else if (x.status === 'rejected'){
                reject(x.data);
              } else {
                promise2.status = 'pending';
                promise2.data = undefined;
              }
            } else {
              /*如果 onResolved 执行的结果不是一个 PromiseNew 对象：给 promise2 改状态以及赋值（self.status = 'resolved'; self.data = x;）
                1、onResolved 正确时：promise2 的值为 x ，状态为 resolved
                2、onResolved 出错时：promise2 的值为catch的err，状态为 rejected
              */
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
              /*如果 onRejected 执行的结果是一个 PromiseNew 对象：给 promise2 改状态以及赋值（与x相等）
                1、执行此 x 对象 then 方法上的 onResolved -> 实际是执行 promise2 的 resolve 方法 ->  resolve 的参数是 x 的值，则会将 promise2 的值设置为 x 的值（状态与x一致）
                2、执行此 x 对象 then 方法上的 onRejected -> 实际是执行 promise2 的 reject  方法 ->  reject 的参数是 x 的值， 则会将 promise2 的值设置为 x 的值（状态与x一致）
              */
              x.then(resolve, reject);
            } else {
              /*如果 onRejected 执行的结果不是一个 PromiseNew 对象：给 promise2 改状态以及赋值（self.status = 'resolved'; self.data = x;）
                1、onRejected 正确时：promise2 的值为 x ，状态为 resolved
                2、onRejected 出错时：promise2 的值为catch的err，状态为 rejected
              */
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

  /*捕获异常
    等价于 then 方法
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


/*测试 PromiseNew 的 catch 方法*/
let c = new PromiseNew(function (resolve, reject) {
  reject('222');
}).catch(function(err) {
  console.log(err);
}); 


/*测试 PromiseNew 的 stop 方法*/
let d = new PromiseNew(function(resolve, reject) {
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
