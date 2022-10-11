/** https://leetcode.cn/problems/counting-bits/
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const a = [0];
  for (let i = 1; i <= n; i += 1) {
    a[i] = a[i & (i - 1)] + 1;
  }
  return a;
};
