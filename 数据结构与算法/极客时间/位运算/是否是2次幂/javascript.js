/** https://leetcode.cn/problems/power-of-two/
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  /** 仅有1个1: 清除最低位的1为0即可 */
  return n > 0 && !(n & (n - 1));
};
