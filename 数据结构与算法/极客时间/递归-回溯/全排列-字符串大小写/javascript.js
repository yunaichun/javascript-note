/** https://leetcode.cn/problems/letter-case-permutation/ */

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  const results = [];
  /** 1、递归树 */
  /** a => a1 -> a1b a1B */
  /** A => A1 -> A1b A1B */
  _helper(s, 0, [], results);
  return results;
};

var _helper = function (s, start, path, results) {
  /** 2、保存结果: 终止条件 */
  if (path.length === s.length) {
    results.push(path.join(""));
    return;
  }
  if (start > s.length - 1) return;

  const char = s[start];
  if (isNaN(Number(char))) {
    /** 字母 */
    path.push(char.toUpperCase());
    _helper(s, start + 1, [...path], results);
    path.pop();
    path.push(char.toLowerCase());
    _helper(s, start + 1, [...path], results);
    path.pop();
  } else {
    /** 数字 */
    path.push(char);
    _helper(s, start + 1, [...path], results);
    path.pop();
  }
};

console.log(letterCasePermutation("a1b2"));
