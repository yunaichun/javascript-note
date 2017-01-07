//像Array类形式存在键：值对。Javascript中一切皆对象，数组也是对象
function Dictionary(){
     this.datastore=new Array();//定义字典类
	 this.add=add;//向字典中添加键值对
	 this.find=find;//寻找键对应的值
	 this.remove=remove;//删除键值对
	 this.showAll=showAll;//显示所有
	 this.count=count;//共有多少键
	 this.clear=clear;//清空字典
}

//向字典类中添加键值对
Dictionary.prototype.add=function(key,value){
	this.datastore[key]=value;
}

//查找某个键对应的值
Dictionary.prototype.find=function(key){
	return this.datastore[key];
}

//删除某个键值对
Dictionary.prototype.remove=function(key){
	delete this.datastore[key]
}

//打印类中所有键值对（循环遍历）:同时增加依据键的字母顺序的排列
Dictionary.prototype.showAll=function(){
	for(key in Object.keys(this.datastore)){
		console.log(key+":"+this.datastore[key]);
	}
}

//计数（公有多少个键值对）
Dictionary.prototype.count=function(){
	var n=0;
	for(key in Object.keys(this.datastore)){
		++n;
	}
	return n;
}

//清空（清空键值对）
Dictionary.prototype.clear=function(){
	for(key in Object.keys(this.datastore)){
		delete this.datastore[key];
	}
}




var p=new Dictionary();
p.add("i","1");
p.add("love","2");
p.add("you","3");
//console.log("初始的字典类：")；
p.showAll();
console.log("初始的字典类的长度："+p.count())
console.log("键为love，对应的值是："+p.find("love"));
p.remove("you");
console.log("删除you之后的字典类：")
p.showAll();
console.log("删除you之后的字典类的长度："+p.count());
