/* Web Worker线程限制：
1、同源限制
分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

2、DOM 限制
Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。

3、通信联系
Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

4、脚本限制
Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

5、文件限制
Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。
*/
self.onmessage = function (e) {
    console.log(e.data);
    var res = dycFib(e.data);
    console.log('子线程发送主线程的消息：', res);
    postMessage(res);
};
self.onerror = function (e) {
    throw e.data;
};


function dycFib(n) {
    var arr = [];
    arr[0] = 1;
    arr[1] = 1;
    for (var i = 2; i < n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[n - 1];
}

/*  ES6实现斐波那契数列：generator函数 + 变量结构赋值
    function* dycFib() {
      let prev = 1
      let curr = 1
      while (true) {
        // 每次遍历返回的是yield后面的值：即prev的值
        yield prev;
        [prev, curr] = [curr, prev + curr];
      }
    }

    // let generator = fibo();
    // for (var i = 0; i < 10; i++) {
    //   console.log(generator.next().value) //=> 1 1 2 3 5 8 13 21 34 55}
    // }

    // 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
    // Generator 函数原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
    let [a, b, c] = fibo();
*/