/** 买卖 1 次: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/ */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let max = 0;
  /** dp 代表第 i 天前的最低点 */
  const dp = [prices[0]];
  for (let i = 1, len = prices.length; i < len; i += 1) {
    dp[i] = Math.min(dp[i - 1], prices[i]);
    max = prices[i] - dp[i];
  }
  return max;
};
