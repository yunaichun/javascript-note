/** https://leetcode.cn/problems/string-to-integer-atoi/ */

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let result = s.trim().match(/^[-+]?\d+/);
  if (result !== null) {
    if (result[0] > Math.pow(2, 31) - 1) {
      return Math.pow(2, 31) - 1;
    }
    if (result[0] < Math.pow(-2, 31)) {
      return Math.pow(-2, 31);
    }

    return result[0];
  }
  return 0;
};
