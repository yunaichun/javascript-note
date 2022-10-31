/** https://leetcode.cn/problems/spiral-matrix/ */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  if (!matrix.length || !matrix[0].length) return [];

  const order = [];
  const [rows, columns] = [matrix.length, matrix[0].length];
  let [left, right, top, bottom] = [0, columns - 1, 0, rows - 1];

  while (left <= right && top <= bottom) {
    /** 上 */
    for (let column = left; column <= right; column++) {
      order.push(matrix[top][column]);
    }
    /** 右 */
    for (let row = top + 1; row <= bottom; row++) {
      order.push(matrix[row][right]);
    }
    if (left < right && top < bottom) {
      /** 下 */
      for (let column = right - 1; column > left; column--) {
        order.push(matrix[bottom][column]);
      }
      /** 左 */
      for (let row = bottom; row > top; row--) {
        order.push(matrix[row][left]);
      }
    }
    [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
  }
  return order;
};
