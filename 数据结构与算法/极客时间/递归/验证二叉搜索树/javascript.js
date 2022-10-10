/** 中序 https://leetcode.com/problems/validate-binary-search-tree/
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isValidBST = function(root) {
  const stack = [];
  const inOrder = -Infinity;
  
  while(stack.length || root !== null) {
    while(root !== null) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (root.val <= inOrder) return false;
    inOrder = root.val;
    root = root.right;
  }
  return true;
};
