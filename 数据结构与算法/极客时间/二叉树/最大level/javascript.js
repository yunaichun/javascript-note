// == leetcode: https://leetcode.com/problems/maximum-depth-of-binary-tree/
class Solution {
    constructor(props) {
    }
    maxDepth(root) {
        if (!root) return 0;
        let max = this._dfs(root);
        return max;
    }
    // == 深度优先 o(n)
    _dfs(root) {
        if (!root) return 0;
        let left = this._dfs(root.left);
        let right = this._dfs(root.right);
        if (left > right) {
            return 1 + left;
        } else {
            return 1 + right;
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
        let max = 0;
        let queue = [];
        queue.push(root);
        while(queue.length) {
            max++;
            let levelSize = queue.length;
            for (let i = 0; i < levelSize; i++) {
                let current = queue[i];
                if (current.left) {
                    queue.push(current.left)
                }
                if (current.right) {
                    queue.push(current.right)
                }
            }
            queue = queue.slice(levelSize)
        }
        return max;
    }
}
