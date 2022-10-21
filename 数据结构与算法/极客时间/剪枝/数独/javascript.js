/** https://leetcode.cn/problems/valid-sudoku */
/** https://leetcode.cn/problems/sudoku-solver  */

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  let res = _helper(board);
  return res;
};

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  _helper(board);
  return board;
};

var _helper = function (board) {
  for (let i = 0, row = board.length; i < row; i += 1) {
    for (let j = 0, column = board[i].length; j < column; j += 1) {
      if (board[i][j] === ".") {
        for (let char = 1; char < 10; char += 1) {
          const isValid = _isVaild(board, i, j, char.toString());
          if (isValid) {
            board[i][j] = char.toString();
            if (_helper(board)) {
              return true;
            } else {
              board[i][j] = ".";
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

var _isVaild = function (board, row, column, char) {
  // /** 行列正确 */
  for (let i = 0; i < 9; i += 1) {
    if (char === board[row][i]) return false;
    if (char === board[i][column]) return false;
  }
  /** 3*3宫格正确 */
  let m = Math.floor(row / 3);
  let n = Math.floor(column / 3);
  for (let i = m * 3; i < m * 3 + 3; i++) {
    for (let j = n * 3; j < n * 3 + 3; j++) {
      if (char === board[i][j]) return false;
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
