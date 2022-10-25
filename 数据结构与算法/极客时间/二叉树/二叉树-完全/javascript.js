/** https://leetcode.cn/problems/check-completeness-of-a-binary-tree/ */

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
var isCompleteTree = function (root) {
  const queue = [];
  if (root) queue.push([root, 1]);
  const results = [];
  /** 包含 index 的遍历 */
  while (queue.length) {
    const current = [];
    let len = queue.length;
    for (let i = 0; i < len; i += 1) {
      const [node, index] = queue[i];
      current.push([node, index]);
      if (node.left)
        queue.push([node.left, (2 * index) % Number.MAX_SAFE_INTEGER]);
      if (node.right)
        queue.push([node.right, (2 * index + 1) % Number.MAX_SAFE_INTEGER]);
    }
    results = results.concat(current);
    queue.splice(0, len);
  }
  return results.length === results[results.length - 1][1];
};
