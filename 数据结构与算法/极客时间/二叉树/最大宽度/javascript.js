/** https://leetcode.cn/problems/maximum-width-of-binary-tree/ */

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
var widthOfBinaryTree = function (root) {
  const queue = [];
  if (root) queue.push([root, 1]);
  let max = -Infinity;
  while (queue.length) {
    const len = queue.length;
    let current = [];
    for (let i = 0; i < len; i += 1) {
      const [node, index] = queue[i];
      current.push(index);
      /** 在JS中最大安全整数是2的53次方减1. */
      if (node.left)
        queue.push([node.left, (index * 2) % Number.MAX_SAFE_INTEGER]);
      if (node.right)
        queue.push([node.right, (index * 2 + 1) % Number.MAX_SAFE_INTEGER]);
    }
    max = Math.max(current[current.length - 1] - current[0] + 1, max);
    queue.splice(0, len);
  }
  return max;
};
