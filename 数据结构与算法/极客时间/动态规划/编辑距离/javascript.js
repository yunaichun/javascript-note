/** https://leetcode.com/problems/edit-distance
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
 var minDistance = function (word1, word2) {
  /** a[i][j]: 代表 word1 的第 i 个单词到 word2 的第 j 个单词所使用的最少操作数 */
  /** a[i][j] = Math.min(a[i - 1][j], a[i][j - 1], a[i - 1][j - 1]) + 1 */
  const a = [];
  for (let i = 0, len = word1.length + 1; i < len; i += 1) {
    if(!a[i]) a[i] = [];
    for (let j = 0, len2 = word2.length + 1; j < len2; j += 1) {
      if (i === 0) {
        /** j 步添加操作 */
        a[i][j] = j;
      } else if (j === 0) {
        /** i 步删除操作 */
        a[i][j] = i;
      } else {
        /** 最后 1 个单词一样的话 */
        if (word1[i - 1] === word2[j - 1]) {
          a[i][j] = a[i - 1][j - 1];
        } else {
          a[i][j] = Math.min(a[i - 1][j], a[i][j - 1], a[i - 1][j - 1]) + 1;
        }
      }
    }
  }

  return a[word1.length][word2.length];
};
