// == leetcode - 309: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/
class Solution {
  constructor() {}
  // == 第一步：定义状态：DP[i][k][j] 代表第 i 天股票最大收益
  // ==        i: 0 -> n -1【代表第 i 天】
  // ==        m: 0 -> k   【0 不可以购买、1 可以购买】
  // ==        j: 0 -> 1   【0 不持有股票， 1 持有股票】
  // == 第二步：状态转移方程：
  // ==        DP[i][0][0] = DP[i - 1][1][1] + a[i]
  // ==        DP[i][0][1] = DP[i - 1][1][0]
  // ==        DP[i][1][0] = MAX(DP[i - 1][1][0], DP[i - 1][0][0])
  // ==        DP[i][1][1] = MAX(DP[i - 1][0][1], DP[i - 1][0][0] - a[i])
  maxProfit(prices) {}
}
