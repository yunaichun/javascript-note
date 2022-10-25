/** https://leetcode.cn/problems/balanced-binary-tree/ */

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
var isBalanced = function (root) {
  if (!root) return true;
  const currentIsRight =
    Math.abs(_helper(root.left) - _helper(root.right)) <= 1;
  const childIsRight = isBalanced(root.left) && isBalanced(right);
  return currentIsRight && childIsRight;
};

var _helper = function (root) {
  if (!root) return 0;
  const left = _helper(root.left);
  const right = _helper(root.right);
  return Math.max(left, right) + 1;
};
