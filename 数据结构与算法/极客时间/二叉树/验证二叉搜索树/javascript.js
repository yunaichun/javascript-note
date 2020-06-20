// == leetcode: https://leetcode.com/problems/validate-binary-search-tree/
class Solution {
    constructor() {
    }
    // == root 为 BST 实例
    // == 方法一：左 < 根 < 右
    isValidBST(root) {
        if (root.left) {
            if (root.val > root.left.val) { 
                return this.isValidBST(root.left);
            } else {
                return false;
            }
        }
        if (root.right) {
            if (root.val < root.right.val) { 
                return this.isValidBST(root.right);
            } else {
                return false;
            }
        }
        return true;
    }
}

