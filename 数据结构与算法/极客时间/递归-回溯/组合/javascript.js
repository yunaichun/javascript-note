/** https://leetcode.cn/problems/combinations/ */

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const results = [];
  /** 1、递归树 */
  /** 1 => [1, 2] [1, 3] [1, 4] */
  /** 2 => [2, 3] [2, 4] */
  /** 3 => [3, 4] */
  _helper(n, k, 1, [], results);
  return results;
};

var _helper = function (n, k, start, path, results) {
  /** 2、把每一条路径加入结果集: 判断是否有结束条件 */
  if (path.length === k) {
    results.push(path);
    return;
  }
  /** 3、做出选择 + 递归下一层 + 撤销选择: 剪枝去重 */
  for (let i = start; i <= n; i += 1) {
    path.push(i);
    _helper(n, k, i + 1, [...path], results);
    path.pop();
  }
};

console.log(combine(4, 2));
