/** https://leetcode.cn/problems/house-robber/ */

/** 15.36 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const len = nums.length;
  if (!len) return 0;
  if (len === 1) return nums[0];

  /** 代表第 i 天偷窃的话最大收益 */
  const dp = [nums[0], Math.max(nums[0], nums[1])];

  for (let i = 2; i < len; i += 1) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  return dp[len - 1];
};
