class Solution:
    def __init__(self):
        super().__init__()
    def isValid(self, s):
        stack = []
        paren_map = { ')': '(', ']': '[', '}': '{' }
        for c in s:
            # 左括号 push
            if c not in paren_map: # c 不属于 paren_map 的 key
                stack.append(c)
                print('{}111{}'.format(c, '333'))
            # 右括号与栈顶比较: 相等则消除
            elif paren_map[c] != stack.pop():
                return False
        # 全部消除后 stack 应该为空
        return not stack
