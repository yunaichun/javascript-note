/** https://leetcode.cn/problems/maximum-subarray/  */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  /** dp[i] 代表【以数组第 i + 1 个数结尾的最大连续子数组】的最大和 */
  const dp = [nums[0]];
  for (let i = 1, len = nums.length; i < len; i += 1) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }
  return Math.max.apply(null, dp);
};
