//1.找出数字数组中最大的元素（使用Match.max函数）
var arr = [1, 2, 3];
Math.max.apply(null, arr);

//2.转化一个数字数组为function数组（每个function都弹出相应的数字）
var arr = [1, 2, 3];
var fun = [];
for (var i = 0, len = arr.length; i < len; i++) {
	(function(j){
		fun[j] = function(){
			return j
		}
	})(arr[i]);
}

//3.给object数组进行排序（排序条件是每个元素对象的属性个数）
var obj = [{a: 1, b: 1}, {a: 1, b: 1, c: 1}];
function getPropertyLength(obj) {
	var count = 0;
	for (var i in obj) {
		obj.hasOwnProperty(i) && count++
	}
	return count;
}
obj.sort(function(i, j){
	return  getPropertyLength(i) - getPropertyLength(j);
})

//4.利用JavaScript打印出Fibonacci数（不使用全局变量）
function getFibonacci(n){
	if(n === 0 || n === 1) {
		return n;
	}
	var arr = [0, 1];
	for(var i = 2; i < n; i++){
		arr[i] = arr[i - 1] + arr[i - 2] 
	}
	return arr[n-1];
}
getFibonacci(5);

//5.实现如下语法的功能：var a = (5).plus(3).minus(6); //2
Number.prototype.plus = function(i) {
	return Number(this.valueOf() + i);
}
Number.prototype.minus = function(i) {
	return Number(this.valueOf() - i);
}
var a = (5).plus(3).minus(6);

//6.实现如下语法的功能：var a = add(2)(3)(4); //9
function add() {
	var arg1 = Array.prototype.slice.call(arguments);
	return function() {
		var arg2 = Array.prototype.slice.call(arguments);
		return function() {
			var arg3 = Array.prototype.slice.call(arguments);
			return parseInt(arg1) + parseInt(arg2) + parseInt(arg3);
		}
	}
}
var a = add(2)(3)(4);

//7.科里化函数进阶
function add(){
	var arg = Array.prototype.slice.call(arguments);
	return arg.reduce(function(a, b){
		return a + b;
	})
}
function curry(fn, n){
	var argArr1 = Array.prototype.slice.call(arguments);
	if (argArr1.length - 2 < n) {
		return function(){
			var argArr2 = Array.prototype.slice.call(arguments);
			return curry.apply(this, argArr1.concat(argArr2))
		}
	} else {
		return fn.apply(this, argArr1.slice(2))
	}
}
curry(add, 3)(1, 2, 3);
