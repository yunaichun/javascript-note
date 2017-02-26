var arr =[{"a":1},{}];
arr.forEach(function(item,ids){
	//item为第一个对象，ids从0开始循环
	console.log(item,ids);
	item.b=ids;
});
console.log(arr);//[ { a: 1, b: 0 }, { b: 1 } ]