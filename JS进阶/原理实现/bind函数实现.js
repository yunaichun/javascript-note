/**
 * [fakeBind 数组reduce方法模拟实现]
 * @param  {Object}       context       [context对象]
 * @return {[Function]}                 [返回函数]
 */
Function.prototype.fakeBind = function (context) {
    let self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    let args = Array.prototype.slice.call(arguments, 1);
    return function () {
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        self.apply(context, args.concat(bindArgs));
    }
}




let foo = {
    value: 1
};
function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}
let bindFoo = bar.fakeBind(foo, 'daisy');
bindFoo('18');
// 1
// daisy
// 18