/** https://leetcode.cn/problems/longest-common-subsequence/ */

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  /** dp[i][j] 代表 截止到 text1[:i] 和 text2[:j] 的最长公共子序列的长度 */
  const dp = [];
  for (let i = 0, len1 = text1.length; i <= len1; i += 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0, len2 = text2.length; j <= len2; j += 1) {
      if (i === 0) {
        /** 空字符串和任何字符串的最长公共子序列的长度都是 0 */
        dp[i][j] = 0;
      } else if (j === 0) {
        dp[i][j] = 0;
      } else {
        if (text1[i - 1] === text2[j - 1]) {
          /** text1 第 i 个单词和 text2 第 j 个单词一样, 公共字符串长度比前个序列加 1 */
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          /** 说明两个子字符串的最后一位不相等: 则可以分别移除掉最后 1 位取最大 */
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
  }
  return dp[text1.length][text2.length];
};

text1 = "01111";
text2 = "10101";
console.log(longestCommonSubsequence(text1, text2));
