/** https://leetcode.cn/problems/word-search */
/** https://leetcode.cn/problems/word-search-ii */

/** 上下左右 */
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const results = [];
  for (let i = 0, len = words.length; i < len; i += 1) {
    const isExist = exist(board, words[i]);
    if (isExist) results.push(words[i]);
  }
  return results;
};

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  if (!board.length) return false;
  /** 1、递归树 */
  /** A -> B */
  /** A -> S */
  const results = [];
  for (let i = 0, len1 = board.length; i < len1; i += 1) {
    for (let j = 0, len2 = board[i].length; j < len2; j += 1) {
      const char = board[i][j];
      if (word.indexOf(char) === 0) {
        _helper(board, word, i, j, [char], [{ x: i, y: j }], results);
      }
    }
  }
  return results.length;
};

var _helper = function (board, word, row, column, path, visited, results) {
  const m = board.length;
  const n = board[0].length;
  if (word.indexOf(path.join("")) !== 0) return;
  /** 2、保存结果: 结束条件 */
  if (path.join("") === word) {
    results.push(path.join(""));
    return;
  }
  /** 3、选择+递归+重置: 剪枝 */
  for (let i = 0; i < 4; i += 1) {
    const x = row + dx[i];
    const y = column + dy[i];
    const isValid = x >= 0 && x < m && y >= 0 && y < n;
    const isVisited = visited.find((i) => i.x === x && i.y === y);
    if (!isValid || isVisited) continue;
    const char = board[x][y];
    path.push(char);
    visited.push({ x, y });
    _helper(board, word, x, y, [...path], [...visited], results);
    path.pop();
    visited.pop();
  }
};

board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
];
words = ["oath", "pea", "eat", "rain"];

console.log(findWords(board, words));
