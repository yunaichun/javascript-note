//定义一个列表类（list object）
function list(){
	this.listSize=0;//列表的元素个数
	this.pos=0;//列表的当前位置
	this.dataStore=[];//存储列表的每一个元素
	this.insert=insert;//在现有元素后插入新元素
	this.append=append;//在列表的末尾添加新元素
	this.remove=remove;//从列表中删除元素
    this.length=length;//返回列表中元素的个数

    this.find=find;//
	this.clear=clear;//清空列表中的所有元素
	this.toString=toString;//返回列表的字符串形式

	this.front=front;//将列表的当前位置移动到第一个元素
	this.end=end;//将列表的当前位置移动到最后一个元素
	this.prev=prev;//将当前位置后移一位
	this.next=next;//将当前位置前移一位
	this.moveTo=moveTo;//将当前位置移动到指定位置

	this.currPos=currPos;//返回列表的当前位置
	this.getElement=getElement;//返回当前位置的元素
	this.contains=contains;
}
//在列表中间插入一个元素
list.prototype.insert=function(element,after){
	var pos=this.find(after);
	if(pos>-1){
		this.dataStore.splice(pos+1,0,element);
		++this.listSize;
		return true;
	}
	return false;
}
//给列表添加元素(添加在末尾)
list.prototype.append=function(element){
    this.dataStore[this.listSize++]=element;//新元素就位后，变量值就加1
}
//执行删除列表中的元素
list.prototype.remove=function(element){
	var pos=this.find(element);
	if(pos>-1){
    	this.dataStore.splice(pos,1);
		--this.listSize;
		return true;
	}else{
    	return false;
	}
}
//在返回列表的长度
list.prototype.length=function(){
	return this.listSize;
}


//先查找到要执行的元素
list.prototype.find=function(element){
   for(i=0;i<this.listSize;i++){
	   if(element==this.dataStore[i]){
		   return i;
	   }
   }
   return -1;
}
//清空列表中所有的元素
list.prototype.clear=function(){
	delete this.dataStore;
	this.dataStre=[];
	this.listSize=this.pos=0;
}
//再显示列表中的元素
list.prototype.toString=function(){
	return this.dataStore;
}


//判断给定值是否在列表中
list.prototype.contains=function(element){
	for(var i=0;i<this.dataStore.length;++i){
          if(element==this.dataStore[i]){
			  return true ;
		  }
	}
	return false;
}

//循环遍历列表
list.prototype.front=function(){
   this.pos=0;
}

list.prototype.end=function(){
	this.pos=this.listSize-1;
}

list.prototype.prev=function(){
	 if(this.pos>=0){
		 --this.pos;
	 }
}
list.prototype.next=function(){
    if(this.pos<this.listSize-1){
      ++this.pos;
	}
}
list.prototype.currPos=function(){
	return this.pos;
}
list.prototype.moveTo=function(position){
	this.pos=position;
}
list.prototype.getElement=function(){
	return this.dataStore[this.pos];
}

var names=new list();
names.append("11");
names.append("22");
names.append("33");
names.front();
console.log(names.getElement());
names.next();
console.log(names.getElement());
names.front();
for(var i=0;i<names.listSize;i++){
	console.log(names.getElement());
	names.next();
}
