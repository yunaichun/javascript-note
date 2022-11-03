/** https://leetcode.cn/problems/minimum-path-sum/ */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  /** dp[i][j] 代表从位置 (0, 0) 到位置 (i, j) 最小路径和 */
  const dp = [];
  for (let i = 0; i < m; i += 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0; j < n; j += 1) {
      if (i === 0 && j === 0) {
        /** 起点 */
        dp[i][j] = grid[i][j];
      } else if (i === 0) {
        /** 只能从左边过来 */
        dp[i][j] = dp[i][j - 1] + grid[i][j];
      } else if (j === 0) {
        /** 只能从上边过来 */
        dp[i][j] = dp[i - 1][j] + grid[i][j];
      } else {
        /** 从上边或左边过来 */
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      }
    }
  }

  return dp[m - 1][n - 1];
};

grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];
grid = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log(minPathSum(grid));
