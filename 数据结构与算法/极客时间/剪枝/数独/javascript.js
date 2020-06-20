// == leetcode-36: https://leetcode.com/problems/valid-sudoku/
// == leetcode-37: https://leetcode.com/problems/sudoku-solver/
class Solution {
    constructor() {
    }
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board) {
        let res = this._dfs(board);
        console.log(board);
        return res;
    }
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solveSudoku(board) {
        this._dfs(board);
        return board;
    }
    // == 深度优先 o(n)
    _dfs(board) {
        for(let i = 0, len = board.length; i < len; i++) {
            for(let j = 0, len = board[i].length; j < len; j++) {
                if (board[i][j] === '.') {
                    for (let char = 1; char < 10; char++) {
                        if (this.isValidChar(board, i, j, char.toString())) {
                            board[i][j] = char.toString();
                            if (this._dfs(board)) {
                                return true;
                            } else {
                                board[i][j] = '.';
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    isValidChar(board, row, col, char) {
        for (let i = 0; i < 9; i++) {
            // == 同一列不能一样
            if (board[i][col] === char) return false;
            // == 同一行不能一样
            if (board[row][i] === char) return false;
        }
        // == 3*3不能一样
        let m = Math.floor(row / 3);
        let n = Math.floor(col / 3);
        for (let i = m * 3; i < m * 3 + 3; i++) {
            for (let j = n * 3; j < n * 3 + 3; j++) {
                if (board[i][j] === char) return false;
            }
        }
        return true;
    }
}


let board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];
var a = new Solution();
console.log(a.isValidSudoku(board))