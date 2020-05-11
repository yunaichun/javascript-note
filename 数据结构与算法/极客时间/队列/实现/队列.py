class Queue:
    def __init__(self):
        self.val = [];
    
    # 入队
    def enqueue(self, item):
        self.val.append(item)

    # 出队
    def dequeue(self):
        front = self.front()
        self.val.remove(front)
        return front

    # 队首元素
    def front(self):
        return self.val[0]
