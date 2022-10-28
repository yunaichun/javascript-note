/** 最小覆盖子串 */
/** https://leetcode.cn/problems/minimum-window-substring/ */
/** https://leetcode.cn/problems/M1oyTv/ */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (s.length < t.length) return "";
  let results = [];
  for (let i = t.length; i <= s.length; i += 1) {
    for (j = i - t.length; j >= 0; j -= 1) {
      const curStr = s.slice(j, i);
      if (_helper(curStr, t)) results.push(curStr);
    }
  }
  results.sort((a, b) => a.length - b.length);
  console.log(results);
  return results.length ? results[0] : "";
};

var _helper = function (a, b) {
  for (let i = 0; i < b.length; i += 1) {
    const index = a.indexOf(b[i]);
    if (index < 0) return false;
    a = a.slice(0, index) + a.slice(index + 1);
  }
  return true;
};

(s = "ADOBECODEBANC"), (t = "ABC");
console.log(minWindow(s, t));
