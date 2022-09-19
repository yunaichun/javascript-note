/** https://leetcode.com/problems/triangle/
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  /** a[i][j]: 代表某个位置从底部到当前位置最小路径和 */
  /** a[i - 1][j] = Math.min(a[i][j], a[i][j + 1]) + triangle[i - 1][j]; */
  const a = [];
  const len = triangle.length - 1;
  a[len] = triangle[len];
  for (let i = len; i > 0; i -= 1) {
    if (!a[i - 1]) a[i - 1] = [];
    for (j = 0, len2 = triangle[i].length; j < len2; j += 1) {
      a[i - 1][j] = Math.min(a[i][j], a[i][j + 1]) + triangle[i - 1][j];
    }
  }
  return a[0][0];
};
