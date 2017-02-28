//定义node类，目的是保存节点
function Node(data,next){
       this.data=data;//此节点对应的数据
	   this.next=next;//指向下一个节点的连接。每次创建默认都为null
}

//定义链表操作的方法
function Llist(){
	this.head=new Node("head",null);//保存链表的头节点（可用this.head.data取得此节点数据，this.head.next取得下一个节点的链接
}
//在已知节点currentData后插入data
Llist.prototype.insert=function(data,currentNode){
     var newNode=new Node(data,null);//每次插入默认下一个节点都为空
	 var currentNode=this.find(currentNode);//已知节点item，要将新节点插入到已知节点后面
	 newNode.next=currentNode.next;//第一步：新节点指向当前节点的下一个节点
	 currentNode.next=newNode;//第二步：当前节点指向新节点
}
//在已知节点后面插入元素，find要找到已知节点item原来指向的节点
Llist.prototype.find=function(data){
     var currNode=this.head;//从根节点开始循环
	 //循环遍历链表所有节点(while指的是循环啊啊啊啊)
	 while(currNode.data!=data){//如果当前节点的属性：数据  与已知节点不同，
		 currNode=currNode.next;//则将节点的指向移动到下一个节点
	 }
	 return currNode;//相同的话，则说明找到成功，返回已知节点
}

//删除节点首先要找到要删除节点前面的节点
Llist.prototype.findPrevious=function(data){
     var currNode=this.head;//从根节点开始循环
	 //循环遍历所有节点，知道某一个节点的下一个节点指向传进来的节点为止
	 while(!(currNode.next==null)&&(currNode.next.data!=data)){
		 currNode=currNode.next;
	 }
	 return currNode;//返回传进来的item节点的前一个节点
}
//删除节点item
Llist.prototype.remove=function(item){
	var prevNode=this.findPrevious(item);
	if(!(prevNode.next==null)){
		prevNode.next=prevNode.next.next;//一步:将要删除的节点的前一个节点直接指向要删除节点的后一个节点
	}
}
//显示链表数据
Llist.prototype.display=function(){
	var currNode=this.head;//从链表的头开始 
	//循环遍历链表，当前节点的next属性为null时结束循环
	while(!(currNode.next==null)){
      console.log(currNode.next.data);//链表的头是head，链表的尾是null
	  currNode=currNode.next;
	}
}




var num=new Llist();
num.insert("11","head");
num.insert("22","11");
num.insert("33","22");
num.insert("44","33");
num.display();
num.remove("44");
num.display();


//此外还有双向链表和循环链表就不叙述了。
