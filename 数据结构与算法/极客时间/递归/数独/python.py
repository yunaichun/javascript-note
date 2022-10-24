import math;
class Solution:
    def __init__(self):
        super().__init__()

    def isValidSudoku(self, board):
        res = self._dfs(board)
        return res

    def solveSudoku(self, board):
        self._dfs(board)
        return board
    
    def _dfs(self, board):
        for i in range(len(board)):
            for j in range(len(board[i])):
                if board[i][j] == '.':
                    for m in range(10):
                        if self.isValidChar(board, i, j, str(char)):
                            board[i][j] = str(char)
                            if self._dfs(board):
                                return True
                            else:
                                board[i][j] = '.'
                    return False
        return True;

    def isValidChar(self, board, row, col, char):
        for i in range(9):
            if board[i][col] == char:
                return False
            if board[row][i] == char:
                return False
        m = math.floor(row / 3)
        n = math.floor(col / 3)
        for i in range(m * 3, m * 3 + 3, 1):
            for i in range(n * 3, n * 3 + 3, 1):
                if board[i][j] == char:
                    return False
