/** https://leetcode.cn/problems/invert-binary-tree/ */

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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  return swap(root);
};

var swap = function (root) {
  if (!root) return null;
  var { left, right } = root;
  root.left = right;
  root.right = left;
  swap(root.left);
  swap(root.right);
  return root;
};
