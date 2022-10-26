/** 买卖 1 次: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/ */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  /** 代表股票在某天之前的最低值 */
  let min = prices[0];
  let max = 0;
  for (let i = 1, len = prices.length; i < len; i += 1) {
    min = Math.min(min, prices[i]);
    max = Math.max(max, prices[i] - min);
  }
  return max;
};
