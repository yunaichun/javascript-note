// == leetcode: https://leetcode.com/problems/minimum-depth-of-binary-tree/
class Solution {
    constructor(props) {
    }
    maxDepth(root) {
        if (!root) return 0;
        let result = this._dfs(root);
        return result;
    }
    // == 深度优先 o(n)
    _dfs(root) {
        if (!root) return 0;
        let left = this._dfs(root.left);
        let right = this._dfs(root.right);
        if (left === 0 || right === 0) return 1;
        if (left > right) {
            return 1 + right;
        } else {
            return 1 + left;
        }
    }
}

class Solution {
    constructor(props) {
    }
    maxDepth(root) {
        if (!root) return 0;
        let result = this._bfs(root);
        return result;
    }
    // == 广度优先 o(n)
    _bfs(root) {
        
    }
}
