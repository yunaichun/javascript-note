import sys
sys.path.append('../最小堆')
from MinHeap import MinHeap

class KthLargest:
    def __init__ (self, k, nums):
        self.k = k
        prev = nums.slice(0, k)
        last = nums.slice(k)
        this.heap = MinHeap(prev)
        for val in last:
            self.add(val)

    def add(self, val):
        if val > self.heap.data[0]:
            self.heap.deleteMax()
            self.heap.add(val)
        return self.heap.data[0]
