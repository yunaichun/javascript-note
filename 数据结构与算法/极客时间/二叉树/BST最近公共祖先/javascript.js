// == leetcode: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
class Solution {
    constructor() {
    }
    lowestBSTAncestor(root, p, q) {
        if (root === null) {
            return null;
        } else {
            if (root.val > p.val && root.val > q.val) {
                return this.lowestBSTAncestor(root.left, p, q);
            }
            if (root.val < p.val && root.val < q.val) {
                return this.lowestBSTAncestor(root.right, p, q);
            }
            return root;
        }
    }
}
