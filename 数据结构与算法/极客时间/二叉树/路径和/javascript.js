/** https://leetcode.cn/problems/sum-root-to-leaf-numbers/ */

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
var sumNumbers = function (root) {
  const queue = [];
  if (root) queue.push([root, [root.val]]);
  let results = 0;
  while (queue.length) {
    const length = queue.length;
    for (let i = 0; i < length; i += 1) {
      const [node, path] = queue[i];
      if (node.left) queue.push([node.left, path.concat(node.left.val)]);
      if (node.right) queue.push([node.right, path.concat(node.right.val)]);
      if (!node.left && !node.right) results += Number(path.join(""));
    }
    queue.splice(0, length);
  }
  return results;
};

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
var a = new TreeNode(1);
var b = new TreeNode(2);
var c = new TreeNode(3);
a.left = b;
a.right = c;
console.log(sumNumbers(a));
