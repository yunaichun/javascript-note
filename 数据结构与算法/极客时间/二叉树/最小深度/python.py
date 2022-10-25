class Solution:
    def __init__(self):
        super().__init__()

    def minDepth(self, root):
        if not root:
            return []
        result = self._dfs(root)
        return result

    def _dfs(self):
        if not root:
            return 0
        left = self._dfs(root.left)
        right = self._dfs(root.right)
        if left == 0 or right == 0:
            return 1
        if left > right:
            return 1 + right
        else:
            return 1 + left
