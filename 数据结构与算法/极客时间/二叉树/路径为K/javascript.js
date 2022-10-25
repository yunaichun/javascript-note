/** https://leetcode.cn/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/ */

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
 * @param {number} target
 * @return {number[][]}
 */
var pathSum = function (root, target) {
  return _bfs(root, target);
};

var _bfs = function (root, target) {
  const results = [];
  const queue = [];
  if (root) queue.push([root, [root.val]]);
  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i += 1) {
      const [node, path] = queue[i];
      if (node.left) queue.push([node.left, path.concat(node.left.val)]);
      if (node.right) queue.push([node.right, path.concat(node.right.val)]);
      if (!node.left && !node.right) {
        const sum = path.reduce((a, b) => a + b);
        if (sum === target) results.push(path);
      }
    }
    queue.splice(0, len);
  }
  return results;
};
