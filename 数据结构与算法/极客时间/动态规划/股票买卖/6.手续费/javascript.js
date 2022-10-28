/** 含有手续费: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/ */

/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  /** dp[i][0] 代表第 i + 1 天 【不持有股票】 最大收益 */
  /** dp[i][1] 代表第 i + 1 天 【持有股票】 最大收益 */
  const dp = [[0, -prices[0]]];
  for (let i = 1, len = prices.length; i < len; i += 1) {
    dp[i] = [
      Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee),
      Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]),
    ];
  }
  return dp[prices.length - 1][0];
};
