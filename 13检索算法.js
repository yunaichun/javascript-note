//定义数组
var nums=new Array();
for(var i=0;i<10;i++){
	nums[i]=Math.floor(Math.random()*11);
}
console.log("原始数组：\n"+nums)


//顺序查找
function seqSearch(arr,data){
	for(var i=0;i<arr.length;++i){
		if(arr[i]==data){
			//return true;
			return i;
		}
	}
	//return false;
	return -1;
}

/*
if(seqSearch(nums,10)){
	console.log("10在数组中");
}else{
	console.log("10不在数组中");
}
*/

var position=seqSearch(nums,10);
if(position>-1){
	console.log("10在这个数组中的索引位置是"+position);
}else{
	console.log("10没有出现在这个数组中");
}




//查找最小值
function findMin(arr){
    var min=arr[0];
	for(var i=1;i<arr.length;i++){
		if(arr[i]<min){
			min=arr[i];
		}
	}
	return min;
}
//查找最大值
function findMax(arr){
	var max=arr[0];
	for(var i=1;i<arr.length;i++){
		if(arr[i]>max){
			max=arr[i];
		}
	}
	return max;
}
console.log("数组中最大值是："+findMax(nums));
console.log("数组中最小值是："+findMin(nums));






//交换数组两个位置
function swap(arr,i,j){
	var temp=arr[i];
	arr[i]=arr[j];
	arr[j]=temp;
}
//自组织查询1（）
function seq1Search(arr,data){
    for(i=0;i<arr.length;++i){
		if(arr[i]==data){
			if(i>0){
				swap(arr,i,i-1);
			}
			return true;
		}
	}
	return false;
}
var numbers=[5,1,7,4,2,10,9,3,6,8];
console.log("自组织查询初始数组："+numbers);
for(var i=1;i<=3;i++){
	seq1Search(numbers,4);
	console.log(numbers);
	console.log(i);
}
seq1Search(numbers,4);
console.log(numbers);



//自组织查询2
function seq2Search(arr,data){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==data&&i>(arr.length*0.2)){
			swap(arr,i,0);
			return true;
		}else if(arr[i]==data){
            return true;
		}
	}
	return false;
}

var nums2=[3,2,1,6,5,4,7,8];
console.log("自组织2查询前数组为："+nums2);
seq2Search(nums2,1);
console.log("自组织查询数组结果："+nums2);




//二分查找算法
function binSearch(arr,data){
	var upperBound=arr.length-1;
	var lowerBound=0;
	while(lowerBound<=upperBound){
		var mid=Math.floor((upperBound+lowerBound)/2);
        if(arr[mid]<data){
			lowerBound=mid+1           
		}else if(arr[mid]>data){
			upperBound=mid-1;
		}else{
			return mid;
		}
	}
	return -1;
}
//排序
function bubbleSort(arr){
	for(i=0;i<arr.length-1;i++){
		for(j=i+1;j<arr.length;j++){
			if(arr[i]>arr[j]){
				swap(arr,i,j);
			}
		}
	}
}

var nums3=new Array();
for(var i=0;i<10;i++){
	nums3[i]=Math.floor(Math.random()*11);
}
console.log("初始数组："+nums3)
bubbleSort(nums3);
console.log("排序好之后的数组："+nums3);
var pos=binSearch(nums3,5);
console.log("5在数组中的位置"+pos);


//计算重复次数
function count(arr,data){
	var count=0;
	var pos=binSearch(arr,data);
    if(pos>-1){
		++count;
		for(var i=pos-1;i>-1;--i){
			if(arr[i]==data){
				++count;
			}else{
				break;
			}
		}
		for(var i=pos+1;i<arr.length;++i){
			if(arr[i]==data){
				++count;
			}else{
				break;
			}
		}
	}
	return count;
}

var total=count(nums3,5);
console.log("查询的5在数组中出现的次数："+total);



//读取txt文档
//var words=read("./readme.txt").split(" ");
//console.log(words);`
