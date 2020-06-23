class Solution:
    def __init__(self):
        super().__init__()

    def isPowerOfTwo(self, n):
        return n > 0 and not (n & (n - 1))
