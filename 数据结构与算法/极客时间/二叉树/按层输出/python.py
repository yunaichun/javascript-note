class Solution:
    def __init__(self):
        super().__init__()

    def levelOrder(self, root):
        if not root:
            return []
        result = self._bfs(root, [], 0)
        return result

    def _bfs(self, root, result, level):
        if not result[level]:
            result[level] = []
        result[level].append(root.val)
        if root.left:
            self._bfs(root.left, result, level + 1)
        if root.right:
            self._bfs(root.right, result, level + 1)
        return result
