/** https://leetcode.com/problems/maximum-subarray/
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  /** a[i]: 代表数组第 i 序号最大和的连续子数组 */
  /** a[i] = Math.max(a[i - 1] + nums[i], a[i - 1]) */
  const a = [];
  a[0] = nums[0];
  for (let i = 1, len = nums.length; i < len; i += 1) {
    a[i] = Math.max(a[i - 1] + nums[i], nums[i]);
  }
  return Math.max.apply(null, a);
};
