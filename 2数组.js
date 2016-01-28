//用spilt分割数组
var sentence="I LOVE YOU";
var words=sentence.split(" ");
for(i=0;i<words.length;i++){
    console.log("word"+i+"="+words[i]);
}






//数组索引
var a=["张三","李四","王五"];
var name="张三";
console.log(a.indexOf(name));
//用join()和toString()将数组按顺序读写出来
console.log(a.join());
console.log(a.toString());






//对数组整体操作，深赋值
var arr1=[];
for(i=0;i<3;i++){
	arr1[i]=i+1;
};
var arr2=[];
function copy(arr1,arr2){
	for(i=0;i<arr1.length;i++){
      arr2[i]=arr1[i];
	}
};
copy(arr1,arr2);
arr1[0]=400;
console.log(arr2[0]);
//数组合并concat()
var arr3=arr1.concat(arr2);
console.log(arr3);
//数组截取splice(),第一个指的是起始索引，第二个参数指的是长度
var arr4=arr3.splice(0, 1);
console.log(arr4);
//可变数组用push()添加至末尾
arr4.push("push进来的");
console.log(arr4.join());
//可变数组用push()添加至开头
arr4.unshift("unshift进来的");
console.log(arr4.join());
//中间位置添加入数组,第一个索引指的是起始位置，第二个默认是0,（在删除的时候指的是删除的长度），第三个指的是添加的元素
var newelements=[0,1,2];
arr4.splice(2,0,newelements);
console.log(arr4.join());
//删除数组末尾
arr4.pop();
console.log(arr4.join());
//删除数组开头第一个
arr4.shift();
console.log(arr4.join());


//reverse()倒序排序
var nums=[1,2,3,4,5];
nums.reverse();
console.log(nums.join());


//sort()方法排序，主要是针对字符串，按照字典顺序，如果对整型数据排序，需要传入比较函数
var nnum=[3,1,2,100,4,200];
function compare(num1,num2){return num1-num2;};
nnum.sort(compare);
console.log(nnum.join());
