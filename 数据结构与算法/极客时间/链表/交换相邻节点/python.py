import sys
sys.path.append('../实现')
from 链表 import ListNode

class Solution:
    def __init__(self):
        super().__init__()
    def swapPairs(self, head):
        # 从头节点开始，同时保存头节点
        prev = self
        prev.next = head
        while prev.next and prev.next.next:
            a = prev.next
            b = a.next
            prev.next, a.next, b.next = b, b.next, a
            # 重置起点
            prev = a
        return self.next
