//forEach操作数组
var arr =[{"a":1},{"b":[2,3]}];
arr.forEach(function(item,index){
	console.log(typeof item);
	item.c=index;
});
console.log(arr);//[ { a: 1, b: 0 }, { b: 1 } ]


//循环遍历Array所有项
function cycleArray(arr){
	var arr=[1,2,3]
	arr.forEach(function(value,index){
		console.log(value,index);
	});
}
//循环遍历Object所有项
var object={"a":1,"b":2}
function cycleObject(object){
	Object.keys(object).forEach(function(key,value){
		console.log(key,value);
	});
}
cycleObject(object);
//判断是对象
function isObject(object){
	if(typeof object==="object"&&!Array.isArray(object)){
		return true;
	}else{
		return false;
	}
}

