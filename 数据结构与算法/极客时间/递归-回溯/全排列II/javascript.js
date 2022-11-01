/** https://leetcode.cn/problems/permutations-ii/ */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  nums.sort();
  const results = [];
  /** 1、递归树 */
  /** [1](重置) => [1, 1] [1, 2] => [1, 1, 2] [1, 2, 1] */
  /** [2](重置) => [2, 1] [2, 1](跳过) => [2, 1, 1] */
  /** [2](跳过) => [1, 1] [1, 2] => [1, 1, 2] [1, 2, 1] */
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
    if (i > 0 && nums[i] === nums[i - 1] && visited[i - 1]) break;
    path.push(nums[i]);
    visited[i] = true;
    _helper(nums, visited, [...path], results);
    visited[i] = false;
    path.pop();
  }
};

// 1, 2
// 1, 2(跳过)

console.log(permuteUnique([1, 2, 2]));
