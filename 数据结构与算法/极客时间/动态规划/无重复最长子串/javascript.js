/** https://leetcode.cn/problems/longest-substring-without-repeating-characters/ */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let len = s.length;
  if (!len) return 0;
  /** dp[i] 指以第 i + 1 结尾的字符串最长无重复子串 */
  const dp = [s[0]];
  for (let i = 1; i < len; i += 1) {
    const index = dp[i - 1].indexOf(s[i]);
    if (index < 0) {
      dp[i] = dp[i - 1] + s[i];
    } else {
      dp[i] = dp[i - 1].slice(index + 1) + s[i];
    }
  }
  const dpLen = dp.map((i) => i.length);
  return Math.max.apply(null, dpLen);
};
