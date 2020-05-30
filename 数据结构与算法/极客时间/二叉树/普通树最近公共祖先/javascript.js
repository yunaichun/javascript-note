// == leetcode: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
class Solution {
    constructor(props) {
    }
    lowestCommonAncestor(root, p, q) {
        if (root === null) {
            return null;
        } else {
            // == root 即不为 q 也不为 p
            let left = this.lowestCommonAncestor(root.left, p, q);
            let right = this.lowestCommonAncestor(root.right, p, q);
            if (left === null && right !== null) {
                return right;
            }
            if (left !== null && right === null) {
                return left;
            }
            return root;
        }
    }
}
