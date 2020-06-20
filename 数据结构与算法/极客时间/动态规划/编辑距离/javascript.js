// == leetcode: https://leetcode.com/problems/edit-distance
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：a[i][j] 代表 word1 前 i 个字符转换到 word2 前 j 个字符需要的最少操作步骤（insert、delete、replace）
    // == 第二步：状态转移方程：a[i][j] = Math.min(a[i -1][j], a[i][j - 1], a[i - 1][j - 1]) + 1
    // == 初始状态：a[i][0] = i, a[0][j] = j
    // == 求 a[m][n]
    minDistance(word1, word2) {
        let m = word1.length;
        let n = word2.length;
        let a = [];
        for (let i = 0; i < m + 1; i++) {
            a[i] = [];
            for (let j = 0; j < n + 1; j++) {
                if (i === 0) {
                    a[i][j] = j; 
                } else if (j === 0) {
                    a[i][j] = i; 
                } else {
                    if (word1[i - 1] === word2[j - 1]) {
                        a[i][j] = a[i - 1][j - 1];
                    } else {
                        a[i][j] = Math.min(a[i -1][j], a[i][j - 1], a[i - 1][j - 1]) + 1;
                    }
                }
            }
        }
        return a[m][n];
    }
}
