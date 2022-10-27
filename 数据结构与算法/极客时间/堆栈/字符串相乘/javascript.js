/** https://leetcode.cn/problems/multiply-strings/ */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  const results = [];

  for (let i = num2.length - 1, j = 0; i >= 0; i -= 1, j += 1) {
    const currentPos = new Array(num2[i] - "0").fill(num1);
    /** num2[i] 为 0, 此时不会计算 */
    if (!currentPos.length) continue;
    let totalPos = currentPos.reduce((a, b) => addStrings(a, b));
    /** 如果计算的总结果为 0, 也不会补位 */
    if (totalPos !== "0") for (k = 0; k < j; k += 1) totalPos += "0";
    results.push(totalPos);
  }

  return results.length ? results.reduce((a, b) => addStrings(a, b)) : "0";
};

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
