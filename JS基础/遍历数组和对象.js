//forEach操作数组
var arr =[{"a":1},{"b":[2,3]}];
arr.forEach(function(item,index){
	console.log(typeof item);
	item.c=index;
});
console.log(arr);//[ { a: 1, b: 0 }, {"b":[2,3],"c":1} ]


//循环遍历Array所有项
var arr=["a","b"];
function cycleArray(arr){
	arr.forEach(function(value,index){
		console.log(value,index);
	});
}
cycleArray(arr);//a 0   b 1


//循环遍历Object所有key项
var object={"a":1,"b":2};
function cycleObjectKeys(object){
	Object.keys(object).forEach(function(key,index){
		console.log(key,index);
	});
}
cycleObjectKeys(object);//a 0   b 1

//循环遍历Object所有value值【通用方法-->遍历数组和对象】
function cycleObjectValues(object){
	for(var i in object){
		console.log(object[i]);
	}
}
cycleObjectValues(object);


//判断是对象还是数组
function isObject(object){
	if(typeof object==="object"&&!Array.isArray(object)){
		return true;
	}else{
		return false;
	}
}

