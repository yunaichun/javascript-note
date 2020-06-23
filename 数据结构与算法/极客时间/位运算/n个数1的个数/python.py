class Solution:
    def __init__(self):
        super().__init__()

    def countBits(self, num):
        bits = [0]
        for i in range(1, num + 1):
            bits[i] = bits[i & (i - 1)] + 1
        return bits
