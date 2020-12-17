/**
 * setTimeout：
 * 代码会将所有同步代码执行，再去执行setTimeout代码，
 * 其含义是下一轮事件的开始
 */
function f1(callback) {　　　　
    setTimeout(function() {
        console.log(111);　　　　
        callback();
        console.log(222);　　　　
    }, 0);
}
function f2() {
    console.log("yibu");
}
console.log("qian");
f1(f2);
console.log("hou");
// qian
// hou
// 111
// yibu
// 222


/**
 * 方法一：
 * 回调函数
 */
// 假定有两个函数f1和f2，后者等待前者的执行结果。
f1();
f2();
// 如果f1是一个很耗时的任务，可以考虑改写f1，把f2写成f1的回调函数。
function f1(callback){
　　setTimeout(function () {
　　　　// f1的任务代码
　　　　callback();
　　}, 1000);
}
// 执行代码就变成下面这样：
f1(f2);


/**
 * 方法二：
 * 事件监听
 */
f1.on('done', f2);//f1绑定事件
function f1(){
　　setTimeout(function () {
　　　　// f1的任务代码
　　　　f1.trigger('done');//触发f1done事件，执行f2
　　}, 1000);
}


/**
 * 方法三：
 * 发布/订阅
 */
jQuery.subscribe("done", f2);//f2向"信号中心"jQuery订阅"done"信号
function f1(){
　　setTimeout(function () {
　　　　// f1的任务代码
　　　　jQuery.publish("done");//f1执行完成后，向"信号中心"jQuery发布"done"信号，从而引发f2的执行
　　}, 1000);
}