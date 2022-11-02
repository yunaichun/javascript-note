/** https://leetcode.cn/problems/palindrome-partitioning/ */

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const results = [];
  /** 1、递归树 */
  /** a -> ab(删除) b -> c*/
  /** aa -> b */
  _helper(s, 0, [], results);
  return results;
};

var _helper = function (s, start, path, results) {
  /** 2、保存结果: 终止条件 */
  if (path.join("").length === s.length) {
    results.push(path);
    return;
  }
  for (let i = start; i < s.length; i += 1) {
    /** 3、选择+递归+重置: 剪枝 */
    const char = s.slice(start, i + 1);
    if (!_isValidChar(char)) continue;
    path.push(char);
    _helper(s, start + char.length, [...path], results);
    path.pop();
  }
};

var _isValidChar = function (char) {
  const n = Math.floor(char.length / 2);
  for (let i = 0; i < n; i += 1) {
    if (char[i] !== char[char.length - i - 1]) return false;
  }
  return true;
};
console.log(partition("aba"));
// console.log(_isValidChar("aba"));
