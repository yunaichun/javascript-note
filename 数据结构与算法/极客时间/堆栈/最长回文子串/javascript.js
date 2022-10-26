/** https://leetcode.cn/problems/longest-palindromic-substring/ */

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length === 0) return "";
  let results = [];
  for (let i = 1, len = s.length; i <= len; i += 1) {
    for (let j = i - 1; j >= 0; j -= 1) {
      const curStr = s.slice(j, i);
      const isPalindrome = _helper(curStr);
      if (isPalindrome) results.push(curStr);
    }
  }
  results = results.sort((a, b) => b.length - a.length);
  return results[0];
};

var _helper = function (str) {
  const len = str.length;
  for (let i = 0; i < Math.floor(len / 2); i += 1) {
    const a = str[i];
    const b = str[len - i - 1];
    if (a !== b) return false;
  }
  return true;
};
