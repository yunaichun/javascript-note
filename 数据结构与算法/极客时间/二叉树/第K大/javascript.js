/** https://leetcode.cn/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/ */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

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
