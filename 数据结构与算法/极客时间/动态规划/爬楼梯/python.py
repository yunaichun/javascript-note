class Solution:
    def __init__(self):
        super().__init__()

    def climbStairs(self, n):
        a = []
        a[0] = 1
        a[1] = 2
        for i in range(2, n):
            a[i] = a[i - 1] + a[i - 2]
        return a[n - 1]
