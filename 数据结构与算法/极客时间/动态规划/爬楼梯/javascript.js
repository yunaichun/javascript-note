/** https://leetcode.cn/problems/climbing-stairs/ */

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  /** dp[i] 代表爬第 i + 1 层楼所需要的步数 */
  const dp = [1, 2];
  for (let i = 2; i < n; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n - 1];
};
