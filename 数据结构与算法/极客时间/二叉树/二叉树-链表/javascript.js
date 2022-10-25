/** https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/ */

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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  let results = [];
  _helper(root, results);
  if (!results.length) return null;
  for (let i = 0, len = results.length; i < len - 1; i += 1) {
    const current = results[i];
    current.left = null;
    current.right = results[i + 1];
  }
  return results[0];
};

var _helper = function (root, results) {
  if (!root) return;
  results.push(root);
  _helper(root.left, results);
  _helper(root.right, results);
};
