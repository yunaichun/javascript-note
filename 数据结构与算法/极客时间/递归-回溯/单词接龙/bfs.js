/** https://leetcode.cn/problems/word-ladder/ */
/** https://leetcode.cn/problems/word-ladder-ii/ */

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  const results = _helper(beginWord, endWord, wordList);
  return results.length;
};

var _helper = function (beginWord, endWord, wordList) {
  const dict = new Set(wordList);
  const letters = "abcdefghijklmnopqrstuvwxyz";

  const queue = [];
  if (beginWord) queue.push([beginWord, [beginWord]]);

  while (queue.length) {
    const length = queue.length;
    /** 遍历当前单词 */
    for (let i = 0; i < length; i += 1) {
      const [word, path] = queue[i];
      if (word === endWord) return path;
      /** 寻找下一个单词 */
      for (let j = 0; j < word.length; j += 1) {
        for (let k = 0; k < letters.length; k += 1) {
          const next = word.slice(0, j) + letters[k] + word.slice(j + 1);
          if (dict.has(next)) {
            queue.push([next, path.concat(next)]);
            dict.delete(next);
          }
        }
      }
    }

    queue.splice(0, length);
  }
  return [];
};

// beginWord = "a";
// endWord = "c";
// wordList = ["a", "b", "c"];
// beginWord = "hit";
// endWord = "cog";
// wordList = ["hot", "dot", "dog", "lot", "log", "cog"];

beginWord = "red";
endWord = "tax";
wordList = ["ted", "tex", "red", "tax", "tad", "den", "rex", "pee"];
console.log(ladderLength(beginWord, endWord, wordList));
