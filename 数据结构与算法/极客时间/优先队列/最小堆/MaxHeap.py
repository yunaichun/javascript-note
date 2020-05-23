import math

class MaxHeap:
    def __init__(self, data=[]):
        self.data = data
        for val in data:
            self.add(val)

    def add(self, val):
        self.data.append(val)
        self.shiftUp()

    def shiftUp(self):
        data = self.data
        i = len(data) - 1
        while i > 0:
            j = math.floor(i / 2)
            if data[i] > data[j]:
                temp = data[i]
                data[i] = data[j]
                data[j] = temp
                i = j
            else:
                break
    
    def deleteMax(self):
        if len(self.data) > 1:
            last = self.data.pop()
            self.data[0] = last
            self.shiftDown()
    
    def shiftDown(self):
        data = self.data
        i = 0
        while 2 * i  < len(data):
            if data[i] < data[2 * i + 1] or data[i] < data[2 * i + 2]:
                if (2 * i + 2) < len(data) and data[2 * i + 1] < data[2 * i + 2]:
                    temp = data[i]
                    data[i] = data[2 * i + 2]
                    data[2 * i + 2] = temp
                    i = 2 * i + 2
                else:
                    temp = data[i]
                    data[i] = data[2 * i + 1]
                    data[2 * i + 1] = temp
                    i = 2 * i + 1
            else:
                break;

heap = MaxHeap()
heap.add(1)
heap.add(5)
heap.add(4)
heap.deleteMax()
print(heap)