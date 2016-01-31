//定义队列类，从构造函数搞起
function Queue(){
	this.dataStore=[];
	this.enqueue=enqueue;//向队尾添加元素
	this.dequeue=dequeue;//向队首删除元素
	this.front=front;//读取队首元素
	this.back=back;//读取队尾原
	this.toString=toString;//显示队列内所有元素
	this.empty=empty;//判断队列是否为空
}

//向队尾添加元素
function enqueue(element){
	this.dataStore.push(element);
}

//向队首去除元素
function dequeue(){
	this.dataStore.shift();
}

//读取队尾元素
function back(){
	return this.dataStore[this.dataStore.length-1];
}

//读取队首元素
function front(){
	return this.dataStore[0];
}

//显示队列内元素
function toSting(){
	var reStr="";
	for(var i=0;i<this.dataStore.length;i++){
		reStr+=this.dataStroe[i]+"\n";
	}
	return reStr;
}

//判断队列是否为空
function empty(){
	if(this.dataStore.length>0){
		return false;
	}else{
		return true;
	}
}


var q=new Queue();
q.enqueue("11");
q.enqueue("22");
q.enqueue("33");
console.log(q.toString());
q.dequeue();
console.log(q.toString());
console.log("此时队首元素："+q.front());
console.log("此时队尾元素："+q.back());









//基数排序
function distribute(nums,queues,n,digit){//其中nums是传进来一组数，queues是个位相同或者十位相同一组数按顺序排列的（前提是0-1大顺序），n是nums数组个数，从0-9应该是10个，digit指的是个位或者十位，1代表个位，10代表十位。
	for(var i=0;i<n;++i){
		if(digit==1){
			queues[nums[i]%10].enqueue(nums[i]);//queues共10个，从第一个进来的数开始，决定进哪个队
		}else{
			queues[Math.floor(nums[i]/10)].enqueue(nums[i]);//按照十位排序（和上面一样）
		}
	}

}

function collect(queues,nums){
	var i=0;
	for(var digit=0;digit<10;++digit){
		while(!queues[digit].empty){
			nums[i++]=queues[digit].dequeue();//进队之后，按照0-9共10个队从0对开始从头取出来
		}
	}
}


function display(arr){
	for(var i=0;i<arr.length;++i){
		console.log(arr[i]);
	}
}



//定义0-9共10个队列
var queues=[];
for(var i=0;i<10;++i){
	queues[i]=new Queue();
}
//产生3个0-100的随机数
var nums=[];
for(var i=0;i<10;++i){
 nums[i]=Math.floor(Math.floor(Math.random()*101));
}


console.log("产生随机数：");
display(nums);
distribute(nums,queues,10,1);//按照个位数排10个队列
collect(queues,nums);//个位数排好队之后，从0队到9队共10队取出来
console.log("按照个位数大小顺序排列之后的顺序是："+"\n");
display(nums);

distribute(nums,queues,10,10);//按照十位数排10个队列
collect(queues,nums);//十位数排好队之后，从0队到9队共10队取出来
console.log("按照十位数大小顺序排列之后的顺序是："+"\n");
display(nums);


