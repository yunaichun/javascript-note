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
for(var i=1;i<arr3.length-1;i++){
	var min=arr3[i];
	var k=i;
	while(k>0&&arr3[k-1]>=min){
		arr3[k]=arr3[k-1];
		--k;
	}
	arr3[k]=min;
}
//插入排序:法二
for(var i=1;i<arr3.length-1;i++){
	var min=arr3[i];
	for(var j=i;arr3[j]>min;j--){
		arr[j]=arr[j-1];
	}
	arr[j]=min;
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
	for(var i=k;i<arr4.length-g[i]-1;i++){
        for(var j=i;j<arr4.length;j+=g[i]){
			if(arr4[j+g[i]]<arr4[j]){
				swap(arr4,j,j+g[i]);
			}
		}
	}
}
console.log(arr4);



// var arr5=new Array();
// for(var i=0;i<3;i++){
// 	arr5[i]=Math.floor(Math.random()*10+1);
// }
// console.log(arr5);
// //快速排序
// var s=[];
// var b=[];
// for(var i=0;i<arr5.length-1;i++){
// 	var jz=arr5[i];
// 	for(var j=1;j<arr5.length;j++){
// 		if(arr5[j]<=jz){
// 			s.push(arr5[j]);
// 		}else{
// 			b.push(arr5[j]);
// 		}
// 	}
// 	arr5=s.concat(jz,b);
// }
// console.log(arr5);
