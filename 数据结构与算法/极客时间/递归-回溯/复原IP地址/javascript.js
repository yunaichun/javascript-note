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
  if (start > s.length) return;
  /** 2、保存结果: 终止条件 */
  if (path.length === 4 && start === s.length) {
    const exist = results.find((i) => i === path.join("."));
    if (!exist) results.push(path.join("."));
    return;
  }
  for (let i = 1; i < 4; i += 1) {
    /** 3、选择+递归+重置: 剪枝 */
    const char = s.slice(start, start + i);
    if (char.length > 1 && char[0] === "0") break;
    if (!char.length || Number(char) < 0 || Number(char) > 255) break;
    path.push(char);
    _helper(s, start + char.length, [...path], results);
    path.pop();
  }
};

s = "25525511135";
console.log(restoreIpAddresses(s));
