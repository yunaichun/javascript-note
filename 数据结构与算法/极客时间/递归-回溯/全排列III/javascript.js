/** https://leetcode.cn/problems/zi-fu-chuan-de-pai-lie-lcof/ */

/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function (s) {
  s = s.split("").sort();
  const results = [];
  /** 1、递归树 */
  _helper(s, [], [], results);
  return results;
};

var _helper = function (s, visited, path, results) {
  /** 2、把每一条路径加入结果集: 判断是否有结束条件 */
  if (path.length === s.length) {
    results.push(path.join(""));
    return;
  }
  for (let i = 0; i < s.length; i += 1) {
    /** 3、做出选择 + 递归下一层 + 撤销选择: 剪枝去重 */
    if (visited[i]) continue;
    if (i > 0 && s[i] === s[i - 1] && visited[i - 1]) break;
    visited[i] = true;
    path.push(s[i]);
    _helper(s, visited, [...path], results);
    visited[i] = false;
    path.pop();
  }
};

console.log(permutation("abb"));
