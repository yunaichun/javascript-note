class Node:
    def __init__(self, data = None, left = None, right = None):
        self.data = data
        self.left = left
        self.right = right
    
    def show(self):
        return self.data

class BST:
    def __init__(self):
        self.head = Node()

    def insert(self, sourceNode):
        first = self.head;
        if first.data == None and first.left == None and first.right == None:
            self.head = sourceNode
        else:
            while True:
                if sourceNode.data < first.data:
                    if first.left == None:
                        first.left = sourceNode
                        break
                    else:
                        first = first.left
                else:
                    if first.right == None:
                        first.right = sourceNode
                        break
                    else:
                        first = first.right
    
    def preOrder(self, node):
        if node:
            print(node.show())
            self.preOrder(node.left)
            self.preOrder(node.right)
    
    def inOrder(self, node):
       if node:
            self.inOrder(node.left)
            print(node.show())
            self.inOrder(node.right)
    
    def postOrder(self, node):
       if node:
            self.postOrder(node.left)
            self.postOrder(node.right)
            print(node.show())
    
    def getMin(self) :
        first = self.head
        while first.left:
            first = first.left
        return first
    
    def getMax(self) :
        first = self.head
        while first.right:
            first = first.right
        return first


a = Node(1)
b = Node(2)
c = Node(3)
bst = BST()
bst.insert(a)
bst.insert(b)
bst.insert(c)
print(bst)
print(bst.preOrder(bst.head))
