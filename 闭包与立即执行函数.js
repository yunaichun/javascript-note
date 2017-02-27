var a=2;
var func=(function(){
	var a=3;
	console.log("内部a的值第一次"+a);//只会显示一次的原因是因为：立即执行函数执行完成之后括号中的内容会被立即回收
	return function(){
		console.log("内部a的值第二次"+a);//第一次为3，第二次为4
		a++;
		console.log(a);//可以访问到内部变量a，由于闭包所以a的值一直存储在内存中
	};
})();
console.log(a);//2（外部变量无法访问外部内部变量，所以一直是a）
func();//4
console.log(a);//2
func();//5
console.log(a);//2