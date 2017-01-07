function CArray(numElements) {
    this.dataStore = [];
    this.pos = 0;//数组初始下标
    this.insert = insert;//push方式插入
    this.toString = toString;
    this.clear = clear;
    this.swap = swap;

    this.numElements = numElements;//最大多大值
    this.setData = setData;//自动生成numElement个数据，范围是0-numElement
    for (var i = 0; i < numElements; ++i) {//初始默认值
        this.dataStore[i] = i;
    }
}
CArray.prototype.setData=function() {
    for (var i = 0; i < this.numElements; ++i) {
        this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
    }
}
CArray.prototype.insert=function(element) {
    this.dataStore[this.pos++] = element;
}
CArray.prototype.toString=function() {
    var restr = "";
    for (var i = 0; i < this.dataStore.length; ++i) {
        retstr += this.dataStore[i] + " ";
        if (i > 0 & i % 10 == 0) {
            retstr += "\n";
        }
    }
    return retstr;
}
CArray.prototype.clear=function() {
    for (var i = 0; i < this.dataStore.length; ++i) {
        this.dataStore[i] = 0;
    }
}
CArray.prototype.swap=function(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}








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

//forEach、map、every、filter、some循环遍历中传入的函数，该函数的传入参数依次是item,index,array.
//forEach遍历循环，可以传入一个函数，对数组中的每个元素使用该函数
var nuum=[1,2,3];
function square(num){console.log(num,num*num);};
nuum.forEach(square);//无返回值，只是对数组中的每一个元素执行相同的此操作
//map方法生成一个新数组
function curve(grade){return grade+=5;};
var newnuum=nuum.map(curve);//返回新数组
console.log(newnuum.join());
var words=["i","love","you"];
function first(word){return word[0];};
var newwords=words.map(first);//返回新数组
console.log(newwords.join(""));//join("")目的是将逗号去掉，如果不传入任何值，则默认以逗号分隔。

//every遍历循环，接收一个返回值为bool值得函数，对数组中每个元素使用该函数,如果对于所有元素该方法返回为true，则返回为true
function isEven(num){return num%2==0;};
var even=nuum.every(isEven);//返回bool值
if(even){console.log("全是偶数");}else{console.log("不全是偶数");};
//filter方法生成新数组，包含every为true的元素
var neweven=nuum.filter(isEven);
console.log(neweven.join());//返回新数组

//some遍历循环，接收一个返回值为bool值得函数，对数组中每个元素使用该函数,如果存在一个为true，则返回就为true
var someEven=nuum.some(isEven);
if(someEven){console.log("存在偶数");}else{console.log("全部不为偶数")};

//reduce循环遍历传入的为4个参数prev(这个是第一项的值，以后为累加各项)、cur(当前值)、index（项的索引）、array(数组对象)
//reduce遍历循环，接收一个函数，返回一个值。该方法会从一个累加值开始，不断对累加值和数组中的后续元素调用该函数，直到数组中的最后一个元素，最后返回得到的累加值
function add(total,currentValue){return total+currentValue;};
var sum=nuum.reduce(add);
console.log(sum);
//注释一：redece方法可以将字符串拼接起来（前提是数组里面的是字符串类型的）
//注释二：redeceRight方法可以从右至左拼接字符串

//二维数组
var grades=[[1,2,3],[4,5],[6,7,8,9,10]];
var total=0;
var average=0.0;
for(i=0;i<grades.length;i++){
	for(j=0;j<grades[i].length;j++){
       total+=grades[i][j];
	}
    average=total/grades[i].length;
	console.log("average"+(i+1)+":"+average);
    total=0;
	average=0.0;//归位
};
