/** https://leetcode.com/problems/validate-binary-search-tree/
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  return _helper(root, -Infinity, Infinity);
};

function _helper(root, lower, higher) {
  if (!root) return true;
  if (root.val >= higher || root.val <= lower) return false;
  return _helper(root.left, lower, root.val) && _helper(root.right, root.val, higher);
}
