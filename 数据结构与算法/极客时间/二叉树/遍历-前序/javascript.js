/** https://leetcode.cn/problems/binary-tree-preorder-traversal/ */

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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  let results = [];
  _helper(root, results);
  return results;
};

var _helper = function (root, results) {
  if (!root) return;
  results.push(root.val);
  _helper(root.left, results);
  _helper(root.right, results);
};
