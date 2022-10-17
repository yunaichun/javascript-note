/** 冻结 1 天: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/ */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const dp = [[0, -prices[0]]];
  /** dp[i][0] 代表第 i 天 【不持有股票】 最大收益 */
  /** dp[i][1] 代表第 i 天 【持有股票】 最大收益 */
  for (let i = 1, len = prices.length; i < len; i += 1) {
    dp[i] = [
      Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]),
      /** 今天持有股票 = 昨天持有股票 + (昨天不持有股票 - prices[i]) */
      /** 昨天不持有股票 = 前天不持有股票 + 前天持有股票&昨天卖出=>今天无法买入(忽略掉) */
      Math.max(dp[i - 1][1], (i - 2 > 0 ? dp[i - 2][0] : 0) - prices[i]),
    ];
  }
  return dp[prices.length - 1][0];
};
