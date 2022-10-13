/** https://leetcode.cn/problems/sqrtx/
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  let [min, max] = [0, x];
  while (true) {
    const mid = (min + max) / 2;
    const midPow = mid * mid;
    if (Math.floor(midPow) === x) return Math.floor(mid);
    else if (midPow > x) max = mid;
    else if (midPow < x) min = mid;
  }
};
