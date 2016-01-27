//用spilt分割数组
var sentence="I LOVE YOU";
var words=sentence.split(" ");
for(i=0;i<words.length;i++){
    console.log("word"+i+"="+words[i]);
}


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
//数组截取splice()
var arr4=arr3.splice(0, 1);
console.log(arr4);
//可变数组用push()添加至末尾
arr4.push("push进来的");
console.log(arr4.join());
//可变数组用push()添加至开头
arr4.unshift("unshift进来的");
console.log(arr4.join());




//数组索引
var a=["张三","李四","王五"];
var name="张三";
console.log(a.indexOf(name));
//用join()和toString()将数组按顺序读写出来
console.log(a.join());
console.log(a.toString());


