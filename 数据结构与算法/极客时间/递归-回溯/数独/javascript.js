/** https://leetcode.cn/problems/valid-sudoku */
/** https://leetcode.cn/problems/sudoku-solver  */

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  _helper(board);
  return board;
};

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  /** 1、递归树 */
  /** . -> 1 */
  /** . -> 2 */
  const results = _helper(board);
  return results;
};

var _helper = function (board) {
  for (let i = 0, len1 = board.length; i < len1; i += 1) {
    for (let j = 0, len2 = board[0].length; j < len2; j += 1) {
      /** 3、选择+递归+重置: 剪枝 */
      if (board[i][j] === ".") {
        for (let char = 1; char < 10; char += 1) {
          const isValidChar = _isValid(board, i, j, char.toString());
          if (isValidChar) {
            board[i][j] = char.toString();
            /** 再次递归寻找下一个 . 此步骤是关键 */
            if (_helper(board)) return true;
            else board[i][j] = ".";
          }
        }
        /** 能走到这里说明 1 - 9 所有数字都试了，不管用 */
        return false;
      }
    }
  }
  return true;
};

var _isValid = function (board, row, column, char) {
  for (let i = 0; i < 9; i += 1) {
    if (board[row][i] === char) return false;
    if (board[i][column] === char) return false;
  }
  const m = Math.floor(row / 3);
  const n = Math.floor(column / 3);
  for (let i = m * 3; i < m * 3 + 3; i += 1) {
    for (let j = n * 3; j < n * 3 + 3; j += 1) {
      if (board[i][j] === char) return false;
    }
  }
  return true;
};

let board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
console.log(isValidSudoku(board));
