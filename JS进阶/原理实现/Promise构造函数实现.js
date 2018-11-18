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
      this.reject(e)
    }
  }

  /*内部resolve函数:
    1、更新status为resolved
    2、设置当前Promise的值
    3、执行收集的回调
  */
  resolve(value) {
    debugger; // 2
    let self = this;
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.data = value;
      // 这里面实际是收集了then函数中的回调
      for(let i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value)
      }
    }
  }

  /*内部resolve函数:
    1、更新status为rejected
    2、设置当前Promise的值
    3、执行收集的回调
  */
  reject(reason) {
    let self = this;
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.data = reason;
      for(var i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason)
      }
    }
  }

  /* 1、执行 onResolved 或者 2、执行onRejected 或者 3、收集 onResolved&onRejected；返回PromiseNew对象
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
      如果promise1被resolve了，此时promise1状态为resolved，promise2的将被4 resolve，
      如果promise1被reject了，此时promise1状态为rejected，promise2将被new Error('sth went wrong') reject

      所以，我们需要在then里面执行onResolved或者onRejected，并根据返回值来确定promise2的结果，
      并且，如果onResolved/onRejected返回的是一个Promise，promise2将直接取这个Promise的结果。
  */
  then(onResolved, onRejected) {
    debugger; // 1
  	let self = this;
    let promise2;

    // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
    onResolved = typeof onResolved === 'function' ? onResolved : function(value) { return value; };
    onRejected = typeof onRejected === 'function' ? onRejected : function(reason) { throw reason; };

    if (self.status === 'resolved') {
      // 返回新的PromiseNew实例
      return promise2 = new PromiseNew(function(resolve, reject) {
        // 因为考虑到onResolved函数有可能throw，所以将代码放在try/catch中
        try {
          /*如果promise1的状态确定是resolved，则执行onResolved，onResolved执行的结果为x*/
          let x = onResolved(self.data);
          /*如果onResolved执行的结果是一个PromiseNew对象*/
          if (x instanceof PromiseNew) {
            /*执行此PromiseNew对象的then方法
              1、执行此PromiseNew对象的then方法，实际上是执行此PromiseNew对象的onResolved 或者 执行onRejected
              2、执行此PromiseNew对象的then方法的onResolved，实际是执行当前返回的PromiseNew的resolve方法（即为x），则会导致后续resolve代码无效
              3、执行此PromiseNew对象的then方法的onRejected，实际是执行当前返回的PromiseNew的reject方法，则会导致后续resolve代码无效
            */
            x.then(resolve, reject);
          }
          /*如果onResolved执行的结果不是一个Promise对象：
            1、onResolved正确时：promise2的值为x，状态为resolved
            2、onResolved出错时：promise2的值为catch的err，状态为rejected
          */
          // 给promise2改状态以及赋值: self.status = 'resolved'; self.data = x;
          resolve(x);
        } catch (e) {
          // 给promise2改状态以及赋值: self.status = 'rejected'; self.data = e;
          reject(e);
        }
      });
    }

    if (self.status === 'rejected') {
      // 返回新的PromiseNew实例
      return promise2 = new PromiseNew(function(resolve, reject) {
        try {
          let x = onRejected(self.data);
          if (x instanceof PromiseNew) {
            x.then(resolve, reject);
          }
          resolve(x);
        } catch (e) {
          reject(e);
        }
      });
    }

    /*如果promise1的状态还处于pending状态，我们并不能确定执行onResolved还是onRejected函数
      所以先将其存入回调数组，待状态确定的时候再确定调用哪个函数
    */
    if (self.status === 'pending') {
      // 返回新的PromiseNew实例
      return promise2 = new PromiseNew(function(resolve, reject) {
        // 将 onResolved 存入 onResolvedCallback 数组中
        self.onResolvedCallback.push(function(value) {
          try {
            let x = onResolved(self.data);
            if (x instanceof PromiseNew) {
              x.then(resolve, reject);
            }
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
        // 将 onRejected 存入 onRejectedCallback 数组中
        self.onRejectedCallback.push(function(reason) {
          try {
            let x = onRejected(self.data);
            if (x instanceof PromiseNew) {
              x.then(resolve, reject);
            }
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  }
}


// 测试：同步resolve
let promise1 = new PromiseNew((resolve, reject) => {
  resolve('hello world');
}).then(function(res) {
  console.log(res);
});
// 测试：异步resolve
let promise2 = new PromiseNew((resolve, reject) => {
  setTimeout(function() {
    resolve('hello world');
  }, 0);
}).then(function(res) {
  console.log(res);
});
// 测试：then返回PromiseNew
let promise3 = new PromiseNew((resolve, reject) => {
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




// 分开执行测试
/*实例new PromiseNew -> 会执行executor函数 -> 执行内部resolve函数*/
let promise4 = new PromiseNew((resolve, reject) => {
  setTimeout(function() {
    resolve('hello world');
  }, 0);
});
/*执行promise1.then函数 -> 判断promise1的状态 -> 立即执行onResolved函数 或者 收集onResolved*/
let promise5 = promise4.then(function(res) {
  console.log(res);
  return new PromiseNew((resolve, reject) => {
    setTimeout(function() {
      resolve('hello world1');
    }, 0);
  });
});
let promise6 = promise5.then(function(res) {
  console.log(res);
});