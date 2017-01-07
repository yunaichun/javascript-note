//定义节点
function Node(data,left,right){
	this.data=data;
	this.left=left;//指向左子节点的连接。每次创建默认都为null。初始值也为null
	this.right=right;//指向右子节点的连接。每次创建默认都为null。初始值也为null
	//显此节点的数据
	this.show=function(){
		return this.data
	};
}

//定义二叉树
function BST(){
	this.root=new Node(null,null,null);//默认根节点为空
	this.insert=insert;//向二叉树中添加节点和数据
	this.inOrder=inOrder;//中序排序
	this.preOrder=preOrder;//先序排序
	this.postOrder=postOrder;//后序排序
	this.getMin=getMin;//查找最小值
	this.getMax=getMax;//查找最大值
	this.find=find;//查找给定值
}

//向二叉树中添加节点和数据
BST.prototype.insert=function(data){
	var newNode =new Node(data,null,null);//每次插入默认左、右子节点都为空
	var current=this.root;//默认从根节点开始插入
	if(current==null){//第一次插入数据
		current.data=newNode;
	}else{//第二次及以上插入数据、
		while(current!=null){
			if(data<current.data){//数据在左边
				current=current.left;
			}else{//数据在右边
				current=current.right;
			}
		}
		current.data=newNode;
	}
}

//查找给定值
BST.prototype.find=function(data){
	var current=this.root;//默认从根节点开始循环
	//如果节点还没有insert任何数据，则直接返回null
	while(current!=null){
		if(current.data==data){
			return current;//返回节点
		}else if(data<current.data){
			current=current.left;
		}else{
			current=current.right;
		}
	}
	return null;
}

//中序排序（先访问左节点，再根节点，最后右子节点）
BST.prototype.inOrder=function(node){
	if(!(node==null)){
		inOrder(node.left);
		console.log(node.show()+" ");
		inOrder(node.right);
	}
}

//先序排序（先访问根节点，再访问左子节点，最后访问右子点）
BST.prototype.preOrder=function(node){
	if(!(node=null)){
		console.log(node.show()+" ");
		preOrder(node.left);
		preOrder(node.right);
	}
}

//后序排序（从叶子节点开始，访问左子节点，右子节点，最后访问根节点）
BST.prototype.postOrder=function(node){
	if(!(node==null)){
		postOrder(node.left);
		postOrder(node.right);
		console.log(node.show()+" ");
	}
}

//查找最小值
BST.prototype.getMin=function(){
	var current=this.root;
	while(!(current.left==null)){
		current=cerrent.left;
	}
	return current.data;
}

//查找最大值
BST.prototype.getMax=function(){
	var current=this.root;
	while(!(current.right==null)){
		current=current.right;
	}
	return current.data;
}







var sz=new BST();
sz.insert("11");
sz.insert("22");
sz.insert("33");
sz.insert("44");
console.log("二叉树中序（从小到大）遍历查询结果：");
sz.inOrder(sz.root);
//console.log("二叉树最大值：")；
console.log("二叉树中最大值是："+sz.getMax());
//console.log("二叉树最小值：")；
console.log("二叉树中最小值是："+sz.getMin());
console.log("二叉树中55值是："+sz.find("55"));
console.log("二叉树中44值是："+sz.find("44"));
