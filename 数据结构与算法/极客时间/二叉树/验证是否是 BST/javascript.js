/** https://leetcode.cn/problems/validate-binary-search-tree/ */

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
var isValidBST = function (root) {
  return _helper(root, -Infinity, Infinity);
};

var _helper = function (root, lower, higher) {
  if (!root) return true;
  if (root.val <= lower || root.val >= higher) return false;
  return (
    _helper(root.left, lower, root.val) && _helper(root.right, root.val, higher)
  );
};
