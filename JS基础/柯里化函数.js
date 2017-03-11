/*柯里化函数：参数无回调函数*/
function currying(fn) {
	//截取第一个参数之外的所有参数
    var out = Array.prototype.slice.call(arguments, 1);
    return function () {
    	//截取所有的参数
        var inner = Array.prototype.slice.call(arguments);
        //调用fn，传入所有参数
        return fn.apply(null, out.concat(inner));
    };
}
function add(a,b,c){
	return a+b+c;
}
console.log(currying(add,4)(1,2,3));//7



//在此理解   闭包.js
function make_pow(n){
	return function(x){
		return Math.pow(x,n);
	}
}
var pow2=make_pow(2);
console.log(pow2(5));//console.log(make_pow(2)(3))




// ES5版本：参数有回调函数
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};
// ES6版本：参数有回调函数
var Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);//call传入多参数
    }
  };
};
// 使用上面的转换器，生成fs.readFile的 Thunk 函数。
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
// 下面是另一个完整的例子。
function f(a, cb) {
  cb(a);
}
let ft = Thunk(f);
let log = console.log.bind(console);//bind绑定到console对象
ft(1)(log) // 1