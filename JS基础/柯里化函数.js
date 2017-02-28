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