/** https://leetcode.com/problems/powx-n/
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
  if (n < 0) return 1 / myPow(x, -n);
  if (n === 0) return  1;
  if (n === 1) return x;
  const a = Math.floor(n / 2);
  const b = n % 2;
  if (b === 0) {
    return myPow(x*x, a);
  } else {
    return myPow(x*x, a) * x;
  }
};
