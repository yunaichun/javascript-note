/** https://leetcode.cn/problems/maximum-product-subarray/ */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  /** dp[i][0] 代表【以数组第 i + 1 个数结尾的最大连续子数组】乘积最大值 */
  /** dp[i][1] 代表【以数组第 i + 1 个数结尾的最大连续子数组】乘积最小值 */
  const dp = [[nums[0], nums[0]]];
  for (let i = 1, len = nums.length; i < len; i += 1) {
    dp[i] = [
      Math.max(dp[i - 1][0] * nums[i], dp[i - 1][1] * nums[i], nums[i]),
      Math.min(dp[i - 1][0] * nums[i], dp[i - 1][1] * nums[i], nums[i]),
    ];
  }
  return Math.max.apply(
    null,
    dp.map((product) => product[0])
  );
};
