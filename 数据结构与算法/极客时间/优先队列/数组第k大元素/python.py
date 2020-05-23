import sys
sys.path.append('../最小堆')
from 链表 import ListNode

class Solution:
    def __init__(self, k, nums):
        super().__init__()
        self.k = k
        self.heap = new MinHeap()
        for val in nums:
            self.add(val)

    def add(self, s):
        self.heap.add(val)
        return self.heap.peek(self.k)
