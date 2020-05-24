class Solution:
    def __init__(self):
        super().__init__()
    def isValid(self, s, t):
        sorted(s) == sorted(t)

class Solution2:
    def __init__(self):
        super().__init__()
    def isAnagram(self, s, t):
        dic1, dic2 = {}, {}
        for item in s:
            dic1[item] = dic1.get(item, 0) + 1
        for item in s:
            dic2[item] = dic2.get(item, 0) + 1
        return dic1 == dic2

class Solution3:
    def __init__(self):
        super().__init__()
    def isAnagram(self, s, t):
        dic1, dic2 = [0]*26, [0]*26
        for item in s:
            # ord() 函数是 chr() 函数（对于 8 位的 ASCII 字符串）的配对函数，
            # 它以一个字符串（Unicode 字符）作为参数，返回对应的 ASCII 数值，或者 Unicode 数值。
            dic1[ord(item) - ord('a')] = dic1.get(item, 0) + 1
        for item in s:
            dic2[ord(item) - ord('a')] = dic2.get(item, 0) + 1
        return dic1 == dic2
