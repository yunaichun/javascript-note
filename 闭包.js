//函数中包含函数；可以访问外部函数的变量(返回的匿名函数中的变量具有全局作用域的值)
function count(){
	var arr=[];
	for(var i=1;i<=3;i++){
		arr.push(function(){
			return i*i;
		})
	}
	return arr;
}

var results=count();
console.log(results);
var f1=results[0];
var f2=results[1];
var f3=results[2];
//全是16.是因为返回的函数引用了变量i；等到三个函数都返回时，他们所引用的变量i已经变成了4
//因此最终结果为16
console.log(f1());
console.log(f2());
console.log(f3());



//必须引用循环变量的话，方法是再创建一个函数，用该函数的参数绑定循环变量当前的值
//无论该循环变量后序如何更改，已绑定到函数参数的值不变
function count2(){
	var arr2=[];
	for(var i=1;i<=3;i++){
		arr2.push((function(n){
             return function(){
				 return n*n;
			 };
		})(i));//创建一个匿名函数并且立刻执行。
	}
	return arr2;
}

var results2=count2();
var f11=results2[0];
var f22=results2[1];
var f33=results2[2];
console.log(f11());
console.log(f22());
console.log(f33());








//闭包携带局部变量x，从外部根本无法访问到变量x
//换句话说，闭包就是携带状态的函数，并且它的状态完全可以对外隐藏起来
function create_counter(initial){
	var x=initial||0;
	return {
		inc:function(){
			x+=1;
            return x;
		}
	}
}

var c1=create_counter();
console.log(c1.inc());
console.log(c1.inc());
console.log(c1.inc());
var c2=create_counter(10);
console.log(c2.inc());
console.log(c2.inc());
console.log(c2.inc());




//闭包还可以把多参数的函数编程单参数的函数
function make_pow(n){
	return function(x){
		return Math.pow(x,n);
	}
}

var pow2=make_pow(2);
var pow3=make_pow(3);
console.log(pow2(5));
console.log(pow3(7));





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
