// == leetcode: https://leetcode.com/problems/binary-tree-level-order-traversal/
class Solution {
    constructor(props) {
    }
    levelOrder(root) {
        if (!root) return [];
        let result = this._bfs(root, [], 0);
        return result;
    }
    // == 深度优先 o(n)
    _dfs (root, result, level) {
        if (!root) return;
        if (!result[level]) result[level] = [];
        result[level].push(root.val);
        this._dfs(root.left, result, level + 1);
        this._dfs(root.right, result, level + 1);
        return result;
    }
}

class Solution2 {
    constructor(props) {
    }
    levelOrder(root) {
        if (!root) return [];
        let result = this._dfs(root, [], 0);
        return result;
    }
    // == 广度优先 o(n)
    _dfs (root, result, level) {
    }
}
