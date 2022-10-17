/** https://leetcode.cn/problems/triangle/  */

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  /** dp[i][j] 代表从底部到坐标 (i, j) 最小路径和 */
  const dp = [];
  dp[triangle.length - 1] = triangle[triangle.length - 1];
  for (i = triangle.length - 2; i >= 0; i -= 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0, len = triangle[i].length; j < len; j += 1) {
      console.log(i, j);
      dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
    }
  }
  return dp[0][0];
};
