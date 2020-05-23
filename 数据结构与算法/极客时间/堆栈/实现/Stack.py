class Stack:
    def __init__(self):
        self.val = [];

    def push(self, item):
        self.val.append(item)

    def pop(self):
        return self.val.pop();

    def peek(self):
        return self.val[len(self.val) - 1];
