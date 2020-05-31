class Solution:
    def __init__(self):
        super().__init__()

    def minDepth(self, root):
        if not root:
            return []
        res = self._dfs(root)
        return res

    def _dfs(self, root):
        if not root:
            return 0
        left = self._dfs(root.left)
        right = self._dfs(root.right)
        if left > right:
            return 1 + left
        else:
            return 1 + right
