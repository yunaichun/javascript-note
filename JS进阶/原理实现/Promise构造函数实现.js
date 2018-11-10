/**
 * 参考地址：https://segmentfault.com/a/1190000009478377#articleHeader3
 */
class PromiseNew {
	// resolver为 function(resolve, reject){ ... }：主要是写resolve函数和reject函数
  constructor(resolver) {
  	// 初始状态为pending
    this.state = 'pending';
    // then成功回调注册函数
    this.doneList = [];
    // then失败回调注册函数
    this.failList = [];
    // 自动执行传入的函数【一般实例Promise的时候，会执行this.resolve.bind(this)函数】
    resolver(this.resolve.bind(this), this.reject.bind(this));
  }

  // 更新state为：fullfilled，并且执行成功处理队列
  resolve() {
    this.state = 'fullfilled';
    let args = Array.prototype.slice.call(arguments);
    // 一、加入延时机制：如果在then方法注册回调之前，resolve函数就执行了，怎么办？比如promise内部的函数是同步函数
    setTimeout(function () {
      this.doneList.forEach((item, key, arr) => {
        item.apply(null, args);
        arr.shift();
      });
    }.bind(this), 0);
  }

  // 更新state为：rejected，并且执行失败处理队列
  reject() {
    this.state = 'rejected';
    let args = Array.prototype.slice.call(arguments);
    // 一、加入延时机制：如果在then方法注册回调之前，resolve函数就执行了，怎么办？比如promise内部的函数是同步函数
    setTimeout(function () {
      this.failList.forEach((item, key, arr) => {
        item.apply(null, args);
        arr.shift();
      });
    }.bind(this), 0);
  }

  // 同时注册成功和失败处理函数
  then(success, fail) {
  	// 二、如果Promise异步操作已经成功：在Promise异步操作成功之前注册的回调都会执行，在Promise异步操作成功这之后调用的then注册的回调就再也不会执行了
  	if (this.state === 'pending') {
      this.done(success || function () { }).fail(fail || function () { });
    } else if (this.state === 'fullfilled') {
    	success();
    } else {
    	fail();
    }
    return this;
  }

  // 注册成功处理函数
  done(handle) {
    if (typeof handle === 'function') {
      this.doneList.push(handle);
    } else {
      throw new Error('缺少回调函数');
    }
    return this;
  }

  // 注册失败处理函数
  fail(handle) {
    if (typeof handle === 'function') {
      this.failList.push(handle);
    } else {
      throw new Error('缺少回调函数');
    }
    return this;
  }

  // 一个处理函数注册到成功和失败
  always(handle) {
    this.done(handle || function () { }).fail(handle || function () { });
    return this;
  }
}

// 测试
new PromiseNew((resolve, reject) => {
  resolve('hello world');
  // reject('you are err');
}).then(function(res) {
	console.log(res);
});