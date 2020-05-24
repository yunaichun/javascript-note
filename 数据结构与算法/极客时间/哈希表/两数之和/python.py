class Solution:
    def __init__(self):
        super().__init__()
    def twoSum(self, nums, target):
        for i, item in enumerate(nums):
            index = nums.index(target - item);
            if index > -1:
                return [i, index]
