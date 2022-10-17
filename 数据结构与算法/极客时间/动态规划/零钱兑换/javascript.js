/** https://leetcode.cn/problems/coin-change/ */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  /** a[i] 代表兑换 i 数量需要的最少的硬币个数 */
  const dp = [0];
  for (let i = 1; i <= amount; i += 1) {
    if (!dp[i]) dp[i] = Infinity;
    for (let j = 0, len = coins.length; j < len; j += 1) {
      if (i - coins[j] >= 0) {
        dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};
