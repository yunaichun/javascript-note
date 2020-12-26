// == leetcode: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
class Solution {
    constructor() {
    }
    lowestCommonAncestor(root, p, q) {
        if (root === null) {
            return null;
        } else {
            // == root 为 q 或为 p，代表找到了
            if(root === p || root === q) return root;
            // == root 即不为 q 也不为 p，继续遍历
            let left = lowestCommonAncestor(root.left, p, q);
            let right = lowestCommonAncestor(root.right, p, q);
            if (left === null) return right;
            if (right === null) return left;
            // == left 和 right 均不为 null，则 left 和 right 是 root 左右子树
            return root;
        }
    }
}
