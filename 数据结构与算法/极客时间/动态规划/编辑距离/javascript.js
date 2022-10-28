/** https://leetcode.cn/problems/edit-distance */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  /** dp[i][j] 代表 word1 第 i 个单词到 word2 第 j 个单词 变换所使用的最少操作数 */
  const dp = [];
  for (let i = 0, len1 = word1.length; i <= len1; i += 1) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0, len2 = word2.length; j <= len2; j += 1) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else {
        if (word1[i - 1] === word2[j - 1]) {
          /** word1 第 i 个单词和 word2 第 j 个单词一样, 编辑距离和前个序列相同 */
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          /** dp[i - 1][j]: 增加 1 个单词到 word1 */
          /** dp[i][j - 1]: 增加 1 个单词到 word2 (等价于删除 word1 的一个单词) */
          /** dp[i - 1][j - 1]: 修改 word1 的第 i 个字符和 word2 的第 j 个字符一样 */
          dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1;
        }
      }
    }
  }
  return dp[word1.length][word2.length];
};
