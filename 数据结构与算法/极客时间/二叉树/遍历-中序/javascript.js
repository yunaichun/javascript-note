/** https://leetcode.cn/problems/binary-tree-inorder-traversal/ */
/** https://leetcode.cn/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/ */

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

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function (root, k) {
  let results = [];
  _helper(root, results);
  return results[results.length - k];
};

var _helper = function (root, results) {
  if (!root) return;
  _helper(root.left, results);
  results.push(root.val);
  _helper(root.right, results);
};
