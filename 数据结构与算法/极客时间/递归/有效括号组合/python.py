class Solution:
    def __init__(self):
        super().__init__()
 
    def generateParenthesis(self, nums):
        result = self._helper(0, 0, n, "", []);
        return result;
    
    def _helper(self, leftUsed, rightUsed, n, current = "", result = []):
        if leftUsed == n and rightUsed == n:
            result.append(current)
            return
        if leftUsed < n:
            self._helper(leftUsed + 1, rightUsed, n, current + '(', result)
        if rightUsed < n and rightUsed < leftUsed:
            self._helper(leftUsed, rightUsed + 1, n, current + ')', result)
        return result
