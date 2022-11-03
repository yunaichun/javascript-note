/** https://leetcode.cn/problems/word-ladder/ */

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  if (wordList.indexOf(endWord) < 0) return 0;
  const results = [];
  /** 1、递归树 */
  _helper(endWord, wordList, [beginWord], results);
  console.log(results);
  if (!results.length) return 0;
  const minLen = Math.min.apply(
    null,
    results.map((i) => i.length)
  );
  return minLen;
};

var _helper = function (endWord, wordList, path, results) {
  /** 2、保存结果: 终止条件 */
  if (path.length && path[path.length - 1] === endWord) {
    results.push(path);
    return;
  }
  for (let i = 0; i < wordList.length; i += 1) {
    /** 3、选择+递归+重置: 剪枝 */
    const char = wordList[i];
    const isValid = _isValid(path, char);
    if (!isValid) continue;
    path.push(char);
    _helper(endWord, wordList, [...path], results);
    path.pop();
  }
};

var _isValid = function (path, char) {
  const visited = path.indexOf(char) > -1;
  if (visited) return false;
  const last = path[path.length - 1];
  if (last.length !== char.length) return false;
  let count = 0;
  for (let i = 0; i < char.length; i += 1) {
    if (last[i] === char[i]) count += 1;
  }
  if (count + 1 !== char.length) return false;

  return true;
};

beginWord = "red";
endWord = "tax";
wordList = ["ted", "tex", "red", "tax", "tad", "den", "rex", "pee"];
console.log(ladderLength(beginWord, endWord, wordList));
