/**
 * 参考地址：https://segmentfault.com/a/1190000009478377#articleHeader3
 */
class PromiseNew {
	// resolver为 function(resolve, reject){ ... }：主要是写resolve函数和reject函数
  constructor(executor) {
  	// 初始状态为pending
    this.state = 'pending';
    // Promise的值
    self.data = undefined;
    // then成功回调注册函数
    this.onResolvedCallback = [];
    // then失败回调注册函数
    this.onRejectedCallback = [];
    // 考虑到执行executor的过程中有可能出错，所以用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
    try {
      // 执行executor
      executor(this.resolve.bind(this), this.reject.bind(this)) 
    } catch(e) {
      this.reject(e)
    }
  }

  // 更新state为：fullfilled，并且执行成功处理队列
  resolve(value) {
    let self = this;
    if (self.state === 'pending') {
      self.state = 'fullfilled';
      self.data = value;
      // 一、加入延时机制：如果在then方法注册回调之前，resolve函数就执行了，怎么办？比如promise内部的函数是同步函数
      setTimeout(function () {
        self.onResolvedCallback.forEach((item, key, arr) => {
          item.apply(null, value);
          arr.shift();
        });
      }, 0);
    }
  }

  // 更新state为：rejected，并且执行失败处理队列
  reject(reason) {
    let self = this;
    if (self.state === 'pending') {
      self.state = 'rejected';
      self.data = reason;
      // 一、加入延时机制：如果在then方法注册回调之前，resolve函数就执行了，怎么办？比如promise内部的函数是同步函数
      setTimeout(function () {
        self.onRejectedCallback.forEach((item, key, arr) => {
          item.apply(null, reason);
          arr.shift();
        });
      }, 0);
    }
  }

  // 同时注册成功和失败处理函数
  then(onResolved, onRejected) {
  	let self = this;
    let promise2;

    // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
    onResolved = typeof onResolved === 'function' ? onResolved : function(v) {}
    onRejected = typeof onRejected === 'function' ? onRejected : function(r) {}

    /*例子如下：
      promise2 = promise1.then(function(value) {
        return 4
      }, function(reason) {
        throw new Error('sth went wrong')
      }) 
    */
    if (self.status === 'resolved') {
      return promise2 = new PromiseNew(function(resolve, reject) {
        // 如果promise1的状态已经确定并且是resolved，我们调用onResolved
        // 因为考虑到有可能throw，所以我们将其包在try/catch块里
        try {
          // 需要在then里面执行onResolved或者onRejected，并根据返回值(标准中记为x)来确定promise2的结果，
          // 并且，如果onResolved/onRejected返回的是一个Promise，promise2将直接取这个Promise的结果
          let x = onResolved(self.data);
          // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
          if (x instanceof PromiseNew) {
            x.then(resolve, reject);
          }
          // 否则，以它的返回值做为promise2的结果
          self.resolve(x);
        } catch (e) {
          // 如果出错，以捕获到的错误做为promise2的结果
          self.reject(e);
        }
      })
    }

    if (self.status === 'rejected') {
      return promise2 = new PromiseNew(function(resolve, reject) {
        try {
          let x = onRejected(self.data);
          if (x instanceof PromiseNew) {
            x.then(resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      })
    }

    if (self.status === 'pending') {
      // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
      // 只能等到Promise的状态确定后，才能确实如何处理。
      // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
      return promise2 = new PromiseNew(function(resolve, reject) {
        self.onResolvedCallback.push(function(value) {
          try {
            var x = onResolved(self.data);
            if (x instanceof PromiseNew) {
              x.then(resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        })

        self.onRejectedCallback.push(function(reason) {
          try {
            var x = onRejected(self.data);
            if (x instanceof PromiseNew) {
              x.then(resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        })
      })
    }
  }
}

// 测试
new PromiseNew((resolve, reject) => {
  resolve('hello world');
  // reject('you are err');
}).then(function(res) {
	console.log(res);
});