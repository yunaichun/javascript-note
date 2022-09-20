/** https://leetcode.com/problems/binary-tree-level-order-traversal/
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) return [];
  const result = _dfs(root, [], 0);
  return result;
};
function _dfs(root, result = [], level = 0) {
  if (!root) return;
  if (!result[level]) result[level] = [];
  result[level].push(root.val);
  _dfs(root.left, result, level + 1)
  _dfs(root.right, result, level + 1)
  return result;
}

function _bfs(root) {
  let levelRes = [];
  const queue = [];
  if (root) queue.push(root);
  while (queue.length) {
    const len = queue.length;
    const current = [];
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      current.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    queue.splice(0, len);
    levelRes.push(current);
  }
  return levelRes;
}
