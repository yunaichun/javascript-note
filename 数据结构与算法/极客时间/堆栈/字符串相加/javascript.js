/** https://leetcode.cn/problems/add-strings/ */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let i = num1.length - 1;
  var j = num2.length - 1;
  const results = [];
  let addOne = 0;
  while (i >= 0 || j >= 0 || addOne !== 0) {
    const a = num1[i] ? num1[i] - 0 : 0;
    const b = num2[j] ? num2[j] - 0 : 0;
    results.unshift((a + b + addOne) % 10);
    if ((a + b + addOne) / 10 >= 1) addOne = 1;
    else addOne = 0;
    i -= 1;
    j -= 1;
  }
  return results.join("");
};
