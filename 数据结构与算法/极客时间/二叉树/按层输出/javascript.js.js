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
    _dfs(root, result = [], level = []) {
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
        let result = this._bfs(root);
        return result;
    }
    // == 广度优先 o(n)
    _bfs(root) {
        let result = [];
        let queue = [];
        queue.push(root);
        while(queue.length) {
            let currentLevel = [];
            let levelSize = queue.length;
            for (let i = 0; i < levelSize; i++) {
                let current = queue[i];
                currentLevel.push(current.val);
                if (current.left) {
                    queue.push(current.left)
                }
                if (current.right) {
                    queue.push(current.right)
                }
            }
            queue = queue.slice(levelSize)
            result.push(currentLevel)
        }
        return result;
    }
}
