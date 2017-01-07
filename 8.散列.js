function HashTable(){
	this.table=new Array(37);//存储散列
	this.simpleHash=simpleHash;//定义散列
	this.showDistro=showDistro;//显示散列表的数据
	this.put=put;//将数据存入散列表
}

//定义散列值：ASCII码值得和除以数组的长度
HashTable.prototype.simpleHash=function(data){
	const H=37;
	var total=0;
	for(var i=0;i<data.length;++i){
		total=H*total+data.charCodeAt(i);
	};
	if(total<0){
		total+=this.table.length-1;
	}
	return parseInt(total%this.table.length);
}

//将数据存入散列表
HashTable.prototype.put=function(data){
	var pos=this.simpleHash(data);//调用散列值
	this.table[pos]=data;
}

//显示散列表的数据
HashTable.prototype.showDistro=function(){
	var n=0;
	for(var i=0;i<this.table.length;++i){
		if(this.table[i]!=undefined){
			console.log(i+":"+this.table[i]);
		}
	}
}

var someNames=["11","22","33"];
var hTable=new HashTable();
for(var i=0;i<someNames.length;++i){
	hTable.put(someNames[i]);
}
hTable.showDistro();

