//定义node类，目的是保存节点
function Node(element){
       this.element=element;//此节点对应的数据
	   this.next=null;//指向下一个节点的连接
}



//定义链表操作的方法
function Llist(){
	this.head=new Node("head");//保存链表的头节点（可用this.head.element取得此节点数据，this.head.next取得下一个节点的链接
	this.find=find;//找到要插入哪个？节点的后面
	this.insert=insert;

	this.findPrevious=findPrevious;//找到要删除哪个？节点的前一个节点
	this.remove=remove;
	this.display=display;
}


//在已知节点后面插入元素，find要找到已知节点item原来指向的节点
function find(item){
     var currNode=this.head;//创建一个新节点，并将链表的头节点赋值给它
	 //循环遍历链表所有节点(while指的是循环啊啊啊啊)
	 while(currNode.element!=item){//如果当前节点的属性：数据  与已知节点不同，
		 currNode=currNode.next;//则将节点的指向移动到下一个节点
	 }
	 return currNode;//相同的话，则说明找到成功，返回已知节点
}


//在已知节点item后插入newelement
function insert(newelement,item){
     var newNode=new Node(newelement);//定义一个新节点，所带的数据是传进来的newelement
	 var current=this.find(item);//已知节点item，要将新节点插入到已知节点后面
	 newNode.next=current.next;//第一步：新节点指向当前节点的下一个节点
	 current.next=newNode;//第二步：当前节点指向新节点
}


//显示链表数据
function display(){
	var currNode=this.head;//从链表的头开始 
	//循环遍历链表，当前节点的next属性为null时结束循环
	while(!(currNode.next==null)){
      console.log(currNode.next.element);//链表的头是head，链表的尾是null
	  currNode=currNode.next;
	}
}





//删除节点首先要找到要删除节点前面的节点
function findPrevious(item){
     var currNode=this.head;
	 //循环遍历所有节点，知道某一个节点的下一个节点指向传进来的节点为止
	 while(!(currNode.next==null)&&(currNode.next.element!=item)){
		 currNode=currNode.next;
	 }
	 return currNode;//返回传进来的item节点的前一个节点
}


//删除节点item
function remove(item){
	var prevNode=this.findPrevious(item);
	if(!(prevNode.next==null)){
		prevNode.next=prevNode.next.next;//一步:将要删除的节点的前一个节点直接指向要删除节点的后一个节点
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
