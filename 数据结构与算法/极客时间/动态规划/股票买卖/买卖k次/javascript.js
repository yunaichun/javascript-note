// == leetcode - 121: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/ (买卖 1 次: k = 1)
// == leetcode - 122: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/  (买卖无数次: k = prices.length - 1)
// == leetcode - 123: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/  (买卖 2 次: k = 2)
// == leetcode - 188: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/  (买卖 k 次)
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：DP[i][k][j] 代表第 i 天股票买卖了 k 次最大收益
    // ==        i: 0 -> n -1
    // ==        m: 0 -> k (代表第 i 天股票已经买卖了 k 次，如果已经买了还没卖代表 k - 1 次)
    // ==        j: 0 -> 1 (0 不持有股票， 1 代表持有股票)
    // == 第二步：状态转移方程：
    // ==        // == 今天不持有股票：前一天不持有，前一天买入今天卖出
    // ==        DP[i][m][0] = Max(DP[i - 1][m][0], DP[i - 1][m - 1][1] + a[i])
    // ==        // == 今天持有股票：前一天持有，前一天卖出今天买入 【不是  DP[i - 1][m - 1][0] 啊】
    // ==        DP[i][m][1] = Max(DP[i - 1][m][1], DP[i - 1][m][0] - a[i])
    // == 初始状态：
    // ==        DP[i][m][0] = 0;
    // ==        DP[i][m][1] = -Math.min.apply(null, prices.slice(0, i + 1));
    // == 求 Max(DP[n - 1][{0, k}][0])
    maxProfit(k, prices) {
        let n = prices.length;
        let DP = this.init(k, prices);
        for (let i = 1; i < n; i++) {
            for (let m = 1; m <= k; m++) {
                DP[i][m][0] = Math.max(DP[i - 1][m][0], DP[i - 1][m - 1][1] + prices[i]);
                DP[i][m][1] = Math.max(DP[i - 1][m][1], DP[i - 1][m][0] - prices[i]);
            }
        }
        console.log(DP);
        return this._get_result(DP, n, k);
    }
    init(k, prices) {
        let n = prices.length;
        let DP = [];
        for (let i = 0; i < n; i++) {
            if (!DP[i]) DP[i] = [];
            for (let m = 0; m <= k; m++) {
                if (!DP[i][m]) DP[i][m] = [];
                DP[i][m][0] = 0;
                DP[i][m][1] = -Math.min.apply(null, prices.slice(0, i + 1));
            }
        }
        return DP;
    }
    _get_result(DP, n, k) {
        let max = DP[n - 1][0][0]
        for (let m = 0; m <= k; m++) {
            if (DP[n - 1][m][0] > max) {
                max = DP[n - 1][m][0];
            }
        }
        return max;
    }
}


var a = new Solution()
// console.log(a.maxProfit(2, [2, 4, 1]))
console.log(a.maxProfit(2, [3, 2, 6, 5, 0, 3]))
