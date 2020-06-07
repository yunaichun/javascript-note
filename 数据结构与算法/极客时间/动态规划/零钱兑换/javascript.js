// == leetcode: https://leetcode.com/problems/climbing-stairs/
class Solution {
    constructor(props) {
    }
    // == 第一步：定义状态：a[i] 代表组成 i 数量的钱所需的最少硬币的数量
    // == 第二步：状态转移方程：a[i] = Math.min(a[i], a[i - coins[j] + 1])
    // == 初始状态：a[0] = 0
    // == 求 a[i]
    coinChange(coins, amount) {
        let a = [];
        a[0] = 0;
        for (let i = 1; i < amount + 1; i++) {
            for (let j = 0; j < coins.length; j++) {
                if (i - coins[j] > -1) {
                    if (a[i]) {
                        a[i] = Math.min(a[i],  a[i - coins[j]] + 1);
                    } else {
                        a[i] = a[i - coins[j]] + 1
                    }
                }
            }
        }
        return a[amount] > amount ? -1 : a[amount];
    }
}
