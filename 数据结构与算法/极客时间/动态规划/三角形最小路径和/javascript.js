// == leetcode: https://leetcode.com/problems/triangle/
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：a[i][j] 代表走到第 i 层 第 j 列所需要的最短路径（从最底部走到最顶部）
    // == 第二步：状态转移方程：a[i][j] = Math.min(a[i -1][j], a[i - 1][j + 1]) + triangle[i][j] 
    // == 初始状态：a[m - 1] = triangle[triangle.length - 1]
    // == 求 a[0][0]
    minimumTotal(triangle) {
        let a = [];
        const level = triangle.length;
        // == 第 level 层
        a[level - 1] = triangle[level - 1];
        // == 根据第 level 层推导出第 level - 1 层
        for (let i = level - 2; i > -1; i--) {
            const currentLevel = triangle[i];
            if(!a[i]) a[i] = [];
            for (let j = 0, len = currentLevel.length; j < len; j++) {
                a[i][j] = Math.min(a[i + 1][j] , a[i + 1][j + 1]) + currentLevel[j];
            }
        }
        return a[0][0];
    }
}
