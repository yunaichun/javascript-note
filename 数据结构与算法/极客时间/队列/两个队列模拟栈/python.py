class MyQueue:
    def __init__(self):
        self.stack1 =[]
        self.stack2 =[]
    
    # 入队
    def enqueue(self, x: int) -> None:
        # 堆栈 1 正常入队
        self.stack1.append(x)
        # 堆栈 2 值为反转堆栈 1
        self.stack2 = self.stack[::-1]

    # 出队
    def dequeue(self) -> int:
        # 堆栈 2 出栈
        i = self.stack2.pop()
        # 堆栈 1 值为反转堆栈 2
        self.stack1 = self.stack2[::-1]
        return i
    
    # 队首元素
    def front(self) -> int:
        # 堆栈 1 第一个元素
        return self.stack1[0]

    def empty(self) -> bool:
        if (len(self.stack1) == 0):
            return True
        return False

queue = MyQueue()

queue.enqueue(1)
queue.enqueue(2)  
print(queue.front()) # returns 1
print(queue.dequeue()) # returns 1
print(queue.empty()) # returns False
