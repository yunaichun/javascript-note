import math

class Solution:
    def __init__(self):
        super().__init__()

    def maxSubArray(self, x):
        MIN = 0;
        MAX = x;
        while True:
            mid = math.ceil((MIN + MAX)/2)
            midPow2 = mid * mid
            if midPow2 == x:
                return mid
            elif MIN + 1 == MAX:
                return MIN
            elif midPow2 < x:
                MIN = mid
            elif midPow2 > x:
                MAX = mid

user1 = Solution()
print(user1.maxSubArray(1))
print(user1.maxSubArray(8))
print(user1.maxSubArray(9))
