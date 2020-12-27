// == leetcode: https://leetcode.com/problems/minimum-depth-of-binary-tree/
class Solution {
    constructor() {
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
        if (!root.left) return right + 1;
        if (!root.right) return left + 1;
        return Math.min(left, right) + 1;
    }
}

class Solution {
    constructor() {
    }
    maxDepth(root) {
        if (!root) return 0;
        let result = this._bfs(root);
        return result;
    }
    // == 广度优先 o(n)
    _bfs(root) {
        let level = 0;
        let queue = [];
        queue.push(root);
        while(queue.length) {
            level++;
            const levelSize = queue.length;
            for (let i = 0; i < levelSize; i++) {
                const current = queue[i];
                if (current.left) {
                    queue.push(current.left)
                }
                if (current.right) {
                    queue.push(current.right)
                }
                if (!current.left && !current.right) {
                    return level;
                }
            }
            queue = queue.slice(levelSize)
        }
    }
}
