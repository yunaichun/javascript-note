import math

class Solution:
    def __init__(self):
        super().__init__()

    def lengthOfLIS(self, nums):
        a = []
        MAX = a[0] = 1
        for i in range(1, len(nums)):
            for j in range(0, i):
                if a[i]:
                    if nums[j] < nums[i]:
                        a[i] = Math.max(a[i], a[j] + 1)
                else:
                    a[i] = a[j]
            MAX = Math.max(a[i], MAX)
        return MAX;
