/** https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/ */

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
var zigzagLevelOrder = function (root) {
  if (!root) return [];
  return _bfs(root);
};

/** 广度优先 */
function _bfs(root) {
  const queue = [];
  if (root) queue.push(root);
  const results = [];
  let isLeftToRight = true;
  while (queue.length) {
    const len = queue.length;
    const current = [];
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      current.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    results.push(isLeftToRight ? current : current.reverse());
    isLeftToRight = !isLeftToRight;
    queue.splice(0, len);
  }
  return results;
}
