import math

class Solution:
    def __init__(self):
        super().__init__()

    def coinChange(self, nums):
        a = [];
        MAX = a[0] = nums[0];
        for i in range(len(nums)):
            a[i] = math.max(a[i - 1] + nums[i], nums[i])
            MAX = math.max(a[i], MAX)
        return MAX

