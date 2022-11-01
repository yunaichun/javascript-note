/** https://leetcode.cn/problems/letter-case-permutation/ */

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  const results = [];
  /** 1、递归树 */
  /** a1 => B2, b2 */
  /** A1 => B2, b2 */
  _helper(s, 0, [], results);
  return results;
};

var _helper = function (s, start, path, results) {
  /** 2、把每一条路径加入结果集: 判断是否有结束条件 */
  if (path.length === s.length) {
    results.push(path.join(""));
    return;
  }
  /** 3、做出选择 + 递归下一层 + 撤销选择: 剪枝去重 */
  const cur = s[start];
  if (isNaN(Number(cur))) {
    /** 字母 */
    path.push(cur.toUpperCase());
    _helper(s, start + 1, [...path], results);
    path.pop();
    path.push(cur.toLowerCase());
    _helper(s, start + 1, [...path], results);
    path.pop();
  } else {
    /** 数字 */
    path.push(cur);
    _helper(s, start + 1, [...path], results);
    path.pop();
  }
  return;
};

console.log(letterCasePermutation("a1b2"));
