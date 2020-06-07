import math

class Solution:
    def __init__(self):
        super().__init__()

    def maxSubArray(self, nums):
        MIN = 0;
        MAX = x;
        while True:
            mid = math.floor((MIN + MAX)/2)
            if mid*mid < x:
                MIN = mid
            elif mid*mid > x:
                MAX = mid
            else:
                return mid
