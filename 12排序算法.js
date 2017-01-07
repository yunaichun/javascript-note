//定义数组
function CArray(numElements){
	this.dataStore=[];//value
	this.pos=0;//key
	this.numElements=numElements;//随机数的最大值,也是数组的长度
	this.insert=insert;//插入数据
	this.toString=toString;//打印数据
	this.clear=clear;//清空数据
	this.setData=setData;//加入随机数据
	this.swap=swap;//交换数据
	for(var i=0;i<numElements;i++){
		this.dataStore[i]=i;//默认是一组连续的数字
	}

	//排序算法
	this.bubbleSort=bubbleSort;//冒泡排序
	this.selectionSort=selectionSort;//选择排序
	this.insertionSort=insertionSort;//插入排序
	this.shellSort=shellSort;//希尔排序
	this.qSort=qSort;//快速排序
}


//加入随机数据
CArray.prototype.setData=function(){
	for(var i=0;i<this.numElements;i++){
		this.dataStore[i]=Math.floor(Math.random()*(this.numElements+1));
	}
}

//清空数组
CArray.prototype.clear=function(){
	for(var i=0;i<this.dataStore.length;i++){
		this.dataStore[i]=0;
	}
}

//向数组中添加数据
CArray.prototype.insert=function(element){
	this.dataStore[this.pos++]=element;
}

//打印数组
CArray.prototype.toString=function(){
	var str="";
	for(var i=0;i<this.dataStore.length;i++){
		//if(i!=10){
        //   str+=this.dataStore[i]+" ";  
		//}else{
		   str+=this.dataStore[i]+"\t";
		//}
        if(i>0&&i%10==9){
			str+="\n";
		}
	}
	return str;
}

//交换数组两个位置的值
CArray.prototype.swap=function(arr,i,j){
	var temp=arr[i];
	arr[i]=arr[j];
	arr[j]=temp;
}

var numElements=100;
var myNums=new CArray(numElements);
console.log("初始默认的数组是：\n"+myNums.toString());
myNums.setData();
console.log("使用方法改变默认数组生成的随机数组是：\n"+myNums.toString());



//冒泡排序
function bubbleSort(){
	for(var i=0;i<this.dataStore.length-1;i++){
        for(var j=i+1;j<this.dataStore.length;j++){
			if(this.dataStore[i]>this.dataStore[j]){
				swap(this.dataStore,i,j);
			}
		}
	}
}
//myNums.bubbleSort();
//console.log("冒泡排序:\n"+myNums.toString());

//选择排序
function selectionSort(){
   for(var i=0;i<this.dataStore.length-1;i++){
	   for(var j=i+1;j<this.dataStore.length;j++){
		   var min=this.dataStore[i];
		   if(this.dataStore[j]<min){
			   swap(this.dataStore,i,j);
		   }
	   }
   }
}
//myNums.selectionSort();
//console.log("选择排序：\n"+myNums.toString());

//插入排序
function insertionSort(){
    for(var i=0;i<this.dataStore.length-1;i++){
		for(var j=0;j<this.dataStore.length-i;j++){
			if(this.dataStore[j+1]<this.dataStore[j]){
				swap(this.dataStore,j,j+1);
			}
		}
	}
}
//myNums.insertionSort();
//console.log("插入排序：\n"+myNums.toString());

//希尔排序
var g=[5,3,1];
function shellSort(){ 
     for(var k=0;k<g.length;k++){
		 for(var i=k;i<this.dataStore.length-g[i]-1;i++){
			 for(var j=i;j<this.dataStore.length;j+=g[i]){
				 if(this.dataStore[j]>this.dataStore[j+g[i]]){
					 swap(this.dataStore,j,j+g[i])
			
				 }
			 }
		 }
	 }
}
//myNums.shellSort();
//console.log("希尔排序：\n"+myNums.toString());

//快速排序
function qSort(arr){
	if(arr.length==0){
		return [];
	}
	var left=[];
	var right=[];
	var pivot=arr[0];
	for(var i=1;i<arr.length;i++){
		if(arr[i]<pivot){
			left.push(arr[i]);
		}else{
			right.push(arr[i]);
		}
	}
	return qSort(left).concat(pivot,qSort(right));
}
//myNums.qSort(myNums.dataStore);
console.log("快速排序：\n"+myNums.qSort(myNums.dataStore));
