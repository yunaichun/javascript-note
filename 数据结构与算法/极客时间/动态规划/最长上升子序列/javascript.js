/** https://leetcode.cn/problems/longest-increasing-subsequence/ */

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  /** dp[i] 代表【以数组第 i + 1 个数结尾的最长严格递增子序列】的长度 */
  const dp = [1];
  for (let i = 1, len = nums.length; i < len; i += 1) {
    if (!dp[i]) dp[i] = 1;
    for (let j = 0; j < i; j += 1) {
      if (nums[i] > nums[j]) dp[i] = Math.max(dp[j] + 1, dp[i]);
    }
  }
  return Math.max.apply(null, dp);
};
