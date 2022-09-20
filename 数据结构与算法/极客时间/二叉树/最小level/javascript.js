/** https://leetcode.com/problems/minimum-depth-of-binary-tree/
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
  return _bfs(root);
};
/** 深度优先 */
function _dfs(root) {
  if (!root) return 0;
  let left = _dfs(root.left);
  let right = _dfs(root.right);
  /** 左节点没有，但是右节点还有，树还没断 */
  if (!root.left) return right + 1;
  /** 右节点没有，但是左节点还有，树还没断 */
  if (!root.right) return left + 1;
  return Math.min(left, right) + 1;
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
      if (!node.left && !node.right) return level;
    }
    queue.splice(0, len);
  }
  return level;
}
