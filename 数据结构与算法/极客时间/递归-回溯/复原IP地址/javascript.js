/** https://leetcode.cn/problems/restore-ip-addresses/ */

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  /** 1、递归树 */
  /** 2 */
  /** 25 */
  /** 255 */
  let results = [];
  _helper(s, 0, [], results);
  return results;
};

var _helper = function (s, start, path, results) {
  /** 2、保存结果: 终止条件 */
  if (path.length === 4 && path.join("").length === s.length) {
    results.push(path.join("."));
    return;
  }
  for (let i = start; i < s.length; i += 1) {
    /** 3、选择+递归+重置: 剪枝 */
    const char = s.slice(start, i + 1);
    if (Number(char) < 0 || Number(char) > 255) continue;
    if (char.length > 1 && char[0] === "0") continue;
    path.push(char);
    _helper(s, start + char.length, [...path], results);
    path.pop();
  }
};

s = "25525511135";
console.log(restoreIpAddresses(s));
