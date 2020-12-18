//匿名函数内部保存对外部变量的引用
for(var i=0;i<3;i++){
	setTimeout(function(){
		console.log(i);//3,3,3
	},3);
}

//解决一：立即执行函数传入参数
for(var i=0;i<3;i++){
	setTimeout((function(a){
		console.log(a);//0,1,2
	})(i),0);
}

//解决二：立即执行函数绑定到最外部
for(var i=0;i<3;i++){
	(function(a){
		setTimeout(function(){
			console.log(a);//0,1,2
	    },0);
	})(i);
}



//注意一：setTimeout+匿名函数+clearTimeout--------------------------
for(var i=0;i<3;i++){
	//匿名函数保存对外部的引用，当内部循环结束的时候才会执行，而最后一次循环结束的时候clearTimeout
	var t=setTimeout(function(){
		console.log(i);//无输出
	},0);//此时不管时间设置如何，setInterval里面的函数都无法运行

	//最后一次清除setTimeout，不加的话会输出3、3、3
	clearTimeout(t);
}

//注意二：setInterval+匿名函数+clearInterval------------------------
for(var i=0;i<3;i++){
	//匿名函数保存对外部的引用，当内部循环结束的时候才会执行，而最后一次循环结束的时候clearInterval
	var t=setInterval(function(){
		console.log(i);//无输出
	},0);//此时不管时间设置如何，setInterval里面的函数都无法运行
    
    //最后一次清除clearInterval，不加的话会无间断输出3、3、3、3、3……
	clearInterval(t);
}



//注意三：setTimeout+立即执行函数函数+clearInterval
for(var i=0;i<3;i++){
    //每次循环都重写了setTimeout，所以之前的setTimeout都会被覆盖
	//同时最后一次循环结束之后，没有传入a的实参i了
	var t=setTimeout((function(a){
		console.log(a);//0,1,2
	})(i),0);

	//此时加不加clearTimeout效果一样
	clearTimeout(t);
}

//注意四：setInterval+立即执行函数函数+clearInterval
for(var i=0;i<3;i++){
	//每次循环都重写了setInterval，所以之前的setInterval都会被覆盖
	//同时最后一次循环结束之后，没有传入a的实参i了
	var t=setInterval((function(a){
		console.log(a);//0,1,2
	})(i),0);

	//此时加不加clearInterval效果一样
	clearInterval(t);
}