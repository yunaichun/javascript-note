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
