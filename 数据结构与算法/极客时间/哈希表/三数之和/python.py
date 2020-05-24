class Solution:
    def __init__(self):
        super().__init__()
    def threeSum(self, nums):
        if len(nums) < 3:
            return []
        nums.sort()
        # https://www.runoob.com/python3/python3-set.html【dict是对象，有键值对】
        res = set()
        for i, m in enumerate(nums[:-2]):
            if i >= 1 and m == nums[i -1]:
                continue
            d = {}
            for j, n in enumerate(nums[i+1:]):
                if n not in d:
                    d[-m-n] = 1
                else:
                    res.add((m, -m-n, n))
        print(res)
        return map(list, res)

nums = [-1, 0, 1, 2, -1, -4]
test = Solution()
test.threeSum(nums)

# a = [5, 4, 3]
# for x in enumerate(a):
#     # (0, 5)
#     # (1, 4)
#     # (2, 3)
#     print(x)
# for i, item in enumerate(a):
#     # 0 5
#     # 1 4
#     # 2 3
#     print(i, item)

# # 列表 list
# a = ['a']
# print(type(a))
# # 元组 tuple
# b = ('b', 'b')
# print(type(b))
# # 字典 dict
# c = { 'c': 'd' }
# print(type(c))
# # 集合 set
# d = { 'd' }
# print(type(d))
