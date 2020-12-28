class UnionAndFind:
    def __init__(self, n):
        super().__init__()
        self.roots = [];
        for i in range(n):
            self.roots[i] = i

    def find(self, i):
        root = i
        while root != self.roots[root]:
            root = self.roots[root]
        while i != self.roots[i]:
            temp = self.roots[i]
            self.roots[i] = root
            i = temp
        return root

    def union(self, x, y):
        rootX = this.find(x)
        rootY = this.find(y)
        self.roots[rootX] = rootY
    