/** https://leetcode.cn/problems/sqrtx/ */

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x === 1) return 1;
  let [min, max] = [0, x];
  while (true) {
    if (max - min === 1) return min;
    const mid = Math.floor((min + max) / 2);
    const midPow = mid * mid;
    if (midPow === x) return mid;
    else if (midPow < x) min = mid;
    else if (midPow > x) max = mid;
  }
};
