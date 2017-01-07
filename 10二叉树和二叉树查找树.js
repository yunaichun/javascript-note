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
	var n =new Node(data,null,null);//添加一个节点，此节点的数据是data,左右节点均为空
	if(this.root==null){
		this.root=n;
	}else{
		var current=this.root;//设当前节点为根节点
	    var parent;
	    while(true){
		  parent=current;
		  //如果插入数据小于当前节点的数据
		  if(data<current.data){
			  current=current.left;//将当前节点设置为原节点的左子节点；
			  //如果当前节点不为空
			  if(current==null){
				  parent.left=n;//插入数据
			      break;//跳出循环
			  }
		  }else{//如果插入数据大于当前节点的数据
			  current=current.right;//将当前节点设置为原节点的右子节点
			  //如果当前节点不为空
			  if(current==null){
				  parent.right=n;//插入数据
				  break;//跳出循环
			  }
		  }
	    }
	}
}

//查找给定值
BST.prototype.find=function(data){
	var current=this.root;
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
