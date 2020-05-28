class Solution:
    def __init__(self):
        super().__init__()

    def isValidBST(self, root):
        if root.left:
            if root.val > root.left.val:
                return self.isValidBST(root.left)
            else:
                return False
        if root.right:
            if root.val < root.left.val:
                return self.isValidBST(root.left)
            else:
                return False
        return True;
