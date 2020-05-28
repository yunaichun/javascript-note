class Solution:
    def __init__(self):
        super().__init__()

    def lowestCommonAncestor(self, root, p, q):
        if root == None:
           return None
        else:
            left = self.lowestCommonAncestor(root.left, p, q)
            right = self.lowestCommonAncestor(root.right, p, q)
            if left != None and right != None:
                return root
            if left == None and right != None:
                return right
            if left != null and right == null:
                return left
