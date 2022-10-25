/** https://leetcode.cn/problems/binary-tree-maximum-path-sum/ */

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
var maxPathSum = function (root) {
  let maxSum = -Infinity;
  var maxGain = function (node) {
    if (!node) return 0;
    /** 递归计算左右子节点的最大贡献值: 只有在最大贡献值大于 0 时，才会选取对应子节点 */
    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);
    /** 节点的最大路径和 = 该节点的值 + 左子节点最大贡献值 + 右子节点最大贡献值 */
    const priceNewpath = node.val + leftGain + rightGain;
    /** 更新答案 */
    maxSum = Math.max(maxSum, priceNewpath);
    /** 节点最大贡献值 = 该节点的值 + 左右贡献最大值 */
    return node.val + Math.max(leftGain, rightGain);
  };
  maxGain(root);
  return maxSum;
};
