var arr=new Array();
arr.push(1);
arr.push(2);
arr.push(4);
arr.push(3);
console.log(arr);

//交换数组函数
function swap(arr,i,j){
	var temp=arr[i];
	arr[i]=arr[j];
	arr[j]=temp;
}


//冒泡排序
for(var i=0;i<arr.length-1;i++){
	for(var j=i+1;j<arr.length;j++){
		if(arr[i]>arr[j]){
             swap(arr,i,j);       
		};
	}
}
console.log(arr);


var arr2=new Array();
arr2.push(5);
arr2.push(6);
arr2.push(8);
arr2.push(7);
console.log(arr2);
//选择排序
for(var i=0;i<arr2.length-1;i++){
	var min=i;
	for(var j=i+1;j<arr2.length;j++){
		if(arr2[j]<arr[min]){
			   min=j;                                                                               
		}
		swap(arr2,i,min);
	}
}
console.log(arr2);



var arr3=new Array();
arr3.push(12);
arr3.push(11);
arr3.push(10);
arr3.push(9);
console.log(arr3);
var start=new Date().getTime();
//插入排序
for(var i=1;i<arr3.length;i++){
	var min=arr3[i];
	var k=i;
	while(k>0&&arr3[k-1]>=min){
		arr3[k]=arr3[k-1];
		--k;
	}
	arr3[k]=min;
}
//插入排序:法二
for(var i=1;i<arr3.length;i++){
	var min=arr3[i];
	for(var j=i;arr3[j-1]>min&&j>=0;j--){
		arr3[j]=arr3[j-1];
	}
	arr3[j]=min;
}
var stop=new Date().getTime();
console.log("插入排序耗时"+(start-stop))
console.log(arr3);


var arr4=new Array();
arr4.push(13);
arr4.push(14);
arr4.push(20);
arr4.push(19);
arr4.push(18);
arr4.push(17);
arr4.push(16);
arr4.push(21);
arr4.push(15);
console.log(arr4);
//希尔排序
var g=[5,3,1];
for(var k=0;k<g.length;k++){
	for(var i=g[k];i<arr3.length;i++){
		var min=arr3[i];
		for(var j=i;arr3[j-g[k]]>min&&j>=g[k];j=j-g[k]){
			arr3[j]=arr3[j-g[k]];
		}
		arr3[j]=min;
	}
}
console.log(arr4);


//快速排序
function qSort(list) {
	if (list.length == 0) {
		return [];
	}
	var lesser = [];
	var greater = [];
	var pivot = list[0];
	for (var i = 1; i < list.length; i++) {
		if (list[i] < pivot) {
			lesser.push(list[i]);
		} else {
			greater.push(list[i]);
		}
	}
	return qSort(lesser).concat(pivot, qSort(greater));
}
var arr5=[6,5,2,3,1,4,7];
console.log(qSort(arr5));

