/** https://leetcode.cn/problems/maximum-depth-of-binary-tree/ */

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
 * @return {number}
 */
var maxDepth = function (root) {
  return _bfs(root);
};

/** 广度优先 */
function _bfs(root) {
  const queue = [];
  if (root) queue.push(root);
  let level = 0;
  while (queue.length) {
    level++;
    const len = queue.length;
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    queue.splice(0, len);
  }
  return level;
}

/** 深度优先 */
function _dfs(root) {
  if (!root) return 0;
  let left = _dfs(root.left);
  let right = _dfs(root.right);
  return Math.max(left, right) + 1;
}
