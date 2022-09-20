/** https://leetcode.com/problems/maximum-depth-of-binary-tree/
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  return _dfs(root);
};

/** 深度优先 */
function _dfs(root) {
  if (!root) return 0;
  let left = _dfs(root.left);
  let right = _dfs(root.right);
  return Math.max(left, right) + 1;
}

/** 广度优先 */
function _bfs(root) {
  let level = 0;
  const queue = [];
  if (root) queue.push(root);
  while(queue.length) {
    level++;
    const len = queue.length;
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    queue.splice(0, len);
  }
  return level;
}
