/** 买卖 2 次: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/ */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const dp = [[0, -prices[0], 0, -prices[0], 0]];
  /** dp[i][0] 代表第 i 天 【不做任何操作】 最大收益 */
  /** dp[i][1] 代表第 i 天状态为 【第一次买入】 最大收益 */
  /** dp[i][2] 代表第 i 天状态为 【第一次卖出】 最大收益 */
  /** dp[i][3] 代表第 i 天状态为 【第二次买入】 最大收益 */
  /** dp[i][4] 代表第 i 天状态为 【第二次卖出】 最大收益 */
  for (let i = 1, len = prices.length; i < len; i += 1) {
    dp[i] = [
      dp[i - 1][0],
      Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1]),
      Math.max(dp[i - 1][1] + prices[i], dp[i - 1][2]),
      Math.max(dp[i - 1][2] - prices[i], dp[i - 1][3]),
      Math.max(dp[i - 1][3] + prices[i], dp[i - 1][4]),
    ];
  }
  return dp[prices.length - 1][4];
};
