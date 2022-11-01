import math

class Solution:
    def __init__(self):
        super().__init__()
 
    def majorityElement(self, nums):
        nums = sorted(nums)
        length = len(nums)
        mid = math.floor(length/2);  # 9/2 = 4.5  # 9//2 = 4
        if len(nums) == 0:
            return None
        if len(nums) == 1:
            return nums[0]
        if nums[mid - 1] == nums[mid] and length != 2:
            left = self.majorityElement(nums[:(mid + 1)])
            right = self.majorityElement(nums[(mid + 1):])
        else:
            left = self.majorityElement(nums[:(mid)])
            right = self.majorityElement(nums[(mid):])
        if nums.count(left) > nums.count(right):
            if nums.count(left) == 1:
                return None
            else:
                return left
        else:
            if nums.count(right) == 1:
                return None
            else:
                return right

test = Solution()
print(test.majorityElement([3, 2, 1, 1, 1, 2, 2])) # 2
print(test.majorityElement([1, 2, 3])) # None
print(test.majorityElement([1, 2, 3, 3, 5, 6])) # 3
