// == leetcode: https://leetcode.com/problems/binary-tree-level-order-traversal/
class Solution {
    constructor(props) {
    }
    levelOrder(root) {
        if (!root) return [];
        let result = this._bfs(root, [], 0);
        return result;
    }
    _bfs (root, result, level) {
        if (!result[level]) result[level] = [];
        result[level].push(root.val);
        if (root.left) {
            this._bfs(root.left, result, level + 1);
        }
        if (root.right) {
            this._bfs(root.right, result, level + 1)
        }
        return result;
    }
}
