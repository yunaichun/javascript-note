/** 买卖 k 次: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/ */

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  /** dp[i][j][0]: 第 i + 1 天 买卖 j 次, 不持有股票的最大收益 */
  /** dp[i][j][1]: 第 i + 1 天 买卖 j 次, 持有股票的最大收益 */
  const dp = [];
  for (let i = 0, len = prices.length; i < len; i += 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0; j <= k; j += 1) {
      if (i === 0) {
        dp[i][j] = [0, -prices[i]];
      } else if (j === 0) {
        dp[i][j] = [0, Math.max(dp[i - 1][j][1], dp[i - 1][j][0] - prices[i])];
      } else {
        dp[i][j] = [
          Math.max(dp[i - 1][j][0], dp[i - 1][j - 1][1] + prices[i]),
          Math.max(dp[i - 1][j][1], dp[i - 1][j][0] - prices[i]),
        ];
      }
    }
  }

  return Math.max.apply(
    null,
    dp[prices.length - 1].map((kProfit) => kProfit[0])
  );
};
