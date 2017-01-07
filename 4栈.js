//定义栈
function Stack(){
	this.dataStore=[];//存储栈数据
	this.top=0;//记录栈顶位置
	this.push=push;//向栈中压入一个新元素
	this.pop=pop;//返回栈顶元素，同时将栈顶位置减少1
	this.peek=peek;//返回数组的第top-1个位置的元素，即栈顶元素
	this.clear=clear;//将top=0,轻松清空栈内元素
	this.length=length;//返回栈顶位置top},看存储多少元素
}

//栈中添加元素(将元素保存在top位置，同时将top+1,让其指向数组中下一个空位置,以便下一次插入)
Stack.prototype.push=function(element){
	this.dataStore[this.top++]=element;//++在前指的是先执行赋值，后进行this.top=this.top+1
}

//去除栈顶元素（先空位置top-1,再返回栈顶元素）
Stack.prototype.pop=function(){
 return this.dataStore[--this.top];//--在前指的是先执行this.top=this.top-1操作，后执行返回
}

//返回栈顶元素，与pop的区别是不删除
Stack.prototype.peek=function(){
	return this.dataStore[this.top-1];
}

//返回栈的长度
Stack.prototype.length=function(){
	return this.top;
}

//清空栈中数据
Stack.prototype.clear=function(){
	this.dataStore=[];
	this.top=0;
}

var s=new Stack();
s.push("11");
s.push("22");
s.push("33");
for(var i=0;i<s.length();i++){
	console.log("栈中第"+(i+1)+"个元素："+s.dataStore[i]);
}
console.log("栈的长度："+s.length());
console.log("栈顶元素："+s.peek());

var popped=s.pop();
console.log("出栈的元素："+popped);
console.log("出栈后栈顶元素："+s.peek());

s.clear();
console.log("清空栈后栈的长度："+s.length());
console.log("空栈栈顶元素是没定义的："+s.peek());







//进制相互转换(余数倒排)
function mulBase(num,base){
	var s=new Stack();
	do{
		s.push(num%base);
		num=Math.floor(num/=base);
	}while(num>0);
	var converted="";
	while(s.length()>0){
		converted+=s.pop();
	}
	return converted;
}

console.log("32转换成2进制是："+mulBase(32,2));
console.log("32转换成8进制是："+mulBase(32,8));


//回文
function isPalindrome(word){
	var s=new Stack();
	for(var i=0;i<word.length;++i){
		s.push(word[i]);
	}
	var rword="";
	while(s.length()>0){
		rword+=s.pop();
	}
	if(word==rword){
		return true;
	}else{
		return false;
	}
}

console.log("hello单词是回文是："+isPalindrome("hello"));
console.log("racecar单词是回文是："+isPalindrome("racecar"));



//使用栈模拟递归函数
function fact(n){
	var s=new Stack();
	while(n>1){
		s.push(n--);
	}
	var ys=1;
	while(s.length()>0){
		ys*=s.pop();
	}
	return ys;
}

console.log("5的阶乘是："+fact(5));
