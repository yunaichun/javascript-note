/** https://leetcode.cn/problems/permutations/ */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let results = [];
  const len = nums.length;
  for (let i = 0; i < len; i += 1) {
    _helper(nums, [nums[i]], results);
  }
  return results;
};

var _helper = function (nums, vistied, results) {
  const len = nums.length;
  if (vistied.length === len) {
    results.push(vistied);
    return;
  }
  for (let i = 0; i < len; i += 1) {
    if (vistied.indexOf(nums[i]) < 0) {
      _helper(nums, vistied.concat(nums[i]), results);
    }
  }
};
