/** https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
  if (!root) return null;
  if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);
  if (p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p, q);
  return root;
};
