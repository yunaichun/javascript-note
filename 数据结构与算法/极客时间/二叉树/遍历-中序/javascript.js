/** https://leetcode.cn/problems/binary-tree-inorder-traversal/ */

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
var inorderTraversal = function (root) {
  const results = [];
  postOrder(root, results);
  return results;
};

var postOrder = function (root, results) {
  if (!root) return;
  postOrder(root.left, results);
  results.push(root.val);
  postOrder(root.right, results);
};
