/** https://leetcode.cn/problems/diameter-of-binary-tree/ */

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
var diameterOfBinaryTree = function (root) {
  var _helper = function (node) {
    if (!node) return 0;
    let left = _helper(node.left);
    let right = _helper(node.right);
    /** 左右子树和最大为当前节点的路径长度 */
    height = Math.max(left + right, height);
    return Math.max(left, right) + 1;
  };
  let height = 0;
  _helper(root);
  return height;
};
