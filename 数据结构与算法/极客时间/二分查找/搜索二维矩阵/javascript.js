/** https://leetcode.cn/problems/search-a-2d-matrix/ */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const arr = matrix.reduce((a, b) => a.concat(b), []);
  let [min, max] = [0, arr.length];
  while (true) {
    if (max - min === 1 && arr[min] !== target && arr[max] !== target)
      return false;
    const mid = Math.floor((min + max) / 2);
    if (target === arr[mid]) return true;
    else if (target > arr[mid]) min = mid;
    else if (target < arr[mid]) max = mid;
  }
};

// matrix = [
//   [1, 3, 5, 7],
//   [10, 11, 16, 20],
//   [23, 30, 34, 60],
// ];
// target = 3;
matrix = [[1]];
target = 0;
console.log(searchMatrix(matrix, target));
