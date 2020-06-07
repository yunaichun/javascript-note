// == leetcode: https://leetcode.com/problems/climbing-stairs/
class Solution {
    constructor(props) {
    }
    // == 第一步：定义状态-a[n]代表爬到n层楼梯需要的步数
    // == 第二步：状态转移方程：a[n] = a[n -1 ] + a[n - 2]
    // == 初始状态：a[0] = 1, a[1] = 2
    // == 求 a[n-1]
    climbStairs(n) {
        let a = [];
        a[0] = 1;
        a[1] = 2;
        for (let i = 2; i < n; i++) {
            a[i] = a[i - 1] + a[i - 2]
        }
        return a[n - 1];
    }
}
