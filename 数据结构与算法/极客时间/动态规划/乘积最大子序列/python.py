import math

class Solution:
    def __init__(self):
        super().__init__()

    def maxProduct(self, nums):
        a = [[nums[0], nums[0]]]
        MAX = nums[0]
        for i in range(len(nums)):
            a[i] = []
            if nums[i] > 0:
                a[i][0] = a[i - 1][0] * nums[i]
                a[i][1] = a[i - 1][1] * nums[i]
            else:
                a[i][0] = a[i - 1][1] * nums[i]
                a[i][1] = a[i - 1][0] * nums[i]
            MAX = Math.max(a[i][0], MAX)
        return MAX

