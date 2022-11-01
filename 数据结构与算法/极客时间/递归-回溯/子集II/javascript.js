/** https://leetcode.cn/problems/subsets-ii/ */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  nums.sort();
  const results = [];
  /** 1、递归树 */
  /** [] */
  /** [1] => [1, 2] [1, 2](需跳过) => [1, 2, 2]*/
  /** [2] => [2, 2] */
  /** [2](需跳过) */
  _helper(nums, 0, [], results);
  return results;
};

var _helper = function (nums, start, path, results) {
  /** 2、把每一条路径加入结果集: 判断是否有结束条件 */
  results.push(path);
  for (let i = start; i < nums.length; i += 1) {
    /** 3、做出选择 + 递归下一层 + 撤销选择: 剪枝去重 */
    if (i > start && nums[i] === nums[i - 1]) continue;
    path.push(nums[i]);
    _helper(nums, i + 1, [...path], results);
    path.pop();
  }
};

// 1, 2
// 1, 2(跳过)
console.log(subsets([1, 2, 2]));
