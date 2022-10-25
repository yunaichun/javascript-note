/** https://leetcode.cn/problems/symmetric-tree/ */

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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  const queue = [];
  if (root) queue.push(root);
  /** 包含 null 的遍历 */
  while (queue.find((i) => i)) {
    const len = queue.length;
    let current = [];
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      current.push(node?.val);
      if (node === null) {
        queue.push(null);
        queue.push(null);
      } else {
        if (node.left) queue.push(node.left);
        else queue.push(null);
        if (node.right) queue.push(node.right);
        else queue.push(null);
      }
    }
    const n = Math.floor(current.length / 2);
    for (let i = 0; i < n; i += 1) {
      const a = current[i];
      const b = current[2 * n - i - 1];
      if (a !== b) return false;
    }
    queue.splice(0, len);
  }
  return true;
};
