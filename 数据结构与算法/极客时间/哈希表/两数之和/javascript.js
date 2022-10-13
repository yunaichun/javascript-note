/** https://leetcode.cn/problems/two-sum/
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for (let i = 0, len = nums.length; i < len; i += 1) {
    const j = nums.indexOf(target - nums[i]);
    if (j > -1 && i !== j) return [i, j];
  }
};
