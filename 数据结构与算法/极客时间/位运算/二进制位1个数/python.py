class Solution:
    def __init__(self):
        super().__init__()

    def hammingWeight(self, n):
        count = 0;
        while n:
            n = n & (n - 1)
            count += 1
        return count
