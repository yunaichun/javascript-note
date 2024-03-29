/** https://leetcode.cn/problems/permutations/ */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const results = [];
  /** 1、递归树 */
  /** [1](重置) => [1, 2] [1, 3] => [1, 2, 3] [1, 3, 2] */
  /** [2](重置) => [2, 1] [2, 3] => [2, 1, 3] [2, 3, 1]*/
  /** [3](重置) => [3, 1] [3, 2] => [3, 1, 2] [3, 2, 1]*/
  _helper(nums, [], [], results);
  return results;
};

var _helper = function (nums, visited, path, results) {
  /** 2、把每一条路径加入结果集: 判断是否有结束条件 */
  if (path.length === nums.length) {
    results.push(path);
    return;
  }
  for (let i = 0; i < nums.length; i += 1) {
    /** 3、做出选择 + 递归下一层 + 撤销选择: 剪枝去重 */
    if (visited[i]) continue;
    path.push(nums[i]);
    visited[i] = true;
    _helper(nums, visited, [...path], results);
    visited[i] = false;
    path.pop();
  }
};

console.log(permute([1, 2, 3]));
