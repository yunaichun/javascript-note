/** https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/ */
/** https://leetcode.cn/problems/zhong-jian-er-cha-shu-lcof/ */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {number[]} preorder 前序 (根 -> 左 -> 右)
 * @param {number[]} inorder 中序 (左 -> 根 -> 右)
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length && !inorder.length) return null;
  const root = new TreeNode(preorder[0]);
  const midIndex = inorder.indexOf(preorder[0]);
  root.left = buildTree(
    preorder.slice(1, midIndex + 1),
    inorder.slice(0, midIndex)
  );
  root.right = buildTree(
    preorder.slice(midIndex + 1),
    inorder.slice(midIndex + 1)
  );
  return root;
};
