class Node:
    def __init__(self, val = None, next = None):
        self.val = val
        self.next = next

class ListNode:
    def __init__(self):
        self.head = Node();

    def insertAfter(self,sourceNode, targetNode = None):
        if not self.head.val and not self.head.next:
            self.head = sourceNode
        else:
            sourceNode.next = targetNode.next
            targetNode.next = sourceNode
        return self.head

    def removeNode(self, node):
        first = self.head
        while first.next:
            if first.next is node:
                first.next = first.next.next
                break
            first = first.next
        return self.head

a = Node(1)
b = Node(2)
c = Node(3)
list = ListNode()
list.insertAfter(a)
list.insertAfter(b, a)
list.insertAfter(c, b)
list.removeNode(b)
print(list)
print(__name__)
