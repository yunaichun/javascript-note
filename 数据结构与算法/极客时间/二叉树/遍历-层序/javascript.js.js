/** https://leetcode.cn/problems/binary-tree-level-order-traversal/ */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  return _bfs(root);
};

/** 广度优先 */
function _bfs(root) {
  const queue = [];
  if (root) queue.push(root);
  const results = [];
  while (queue.length) {
    const current = [];
    const len = queue.length;
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      current.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    results.push(current);
    queue.splice(0, len);
  }
  return results;
}

/** 深度优先 */
function _dfs(root, result = [], level = 0) {
  if (!root) return;
  if (!result[level]) result[level] = [];
  result[level].push(root.val);
  _dfs(root.left, result, level + 1);
  _dfs(root.right, result, level + 1);
  return result;
}
