/** https://leetcode.cn/problems/subsets/ */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const results = [];
  /** 1、递归树 */
  /** [] */
  /** [1] => [1, 2] [1, 3](重置) => [1, 2, 3]*/
  /** [2] => [2,3] */
  /** [3] */
  _helper(nums, 0, [], results);
  return results;
};

var _helper = function (nums, start, path, results) {
  /** 2、把每一条路径加入结果集: 判断是否有结束条件 */
  results.push(path);
  for (let i = start; i < nums.length; i += 1) {
    /** 3、做出选择 + 递归下一层 + 撤销选择: 剪枝去重 */
    path.push(nums[i]);
    _helper(nums, i + 1, [...path], results);
    path.pop();
  }
};

console.log(subsets([1, 2, 3]));
