class Solution:
    def __init__(self):
        super().__init__()

    def minDepth(self, root):
        if not root:
            return []
        result = self._dfs(root)
        return result

    def _dfs(self):