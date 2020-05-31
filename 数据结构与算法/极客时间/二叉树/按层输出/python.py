class Solution:
    def __init__(self):
        super().__init__()

    def levelOrder(self, root):
        if not root:
            return []
        result = self._dfs(root, [], 0)
        return result

    def _dfs(self, root, result, level):
        if not root:
            return
        if not result[level]:
            result[level] = []
        result[level].append(root.val)
        self._dfs(root.left, result, level + 1)
        self._dfs(root.right, result, level + 1)
        return result
