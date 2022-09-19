/** https://leetcode.com/problems/climbing-stairs/
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  /** a[i]: 代表爬第 i 层楼所需要的步数 */
  /** a[i] = a[i - 1] + a[i - 2] */
  const a = [];
  a[0] = 1;
  a[1] = 2;
  for (let i = 2; i < n; i += 1) {
    a[i] = a[i - 1] + a[i - 2];
  }
  return a[n - 1];
};
