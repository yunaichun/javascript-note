class Trie:
    def __init__(self):
        super().__init__()
        self.result = [];
        self.END_OF_WORD = '#';
        self.dx = [-1, 1, 0, 0];
        self.dy = [0, 0, -1, 1];

    def exist(self, board, word):
        result = self.findWords(board, [word]);
        return result.length;

    def findWords(self, board, words):
        if not board or not board[0]: return []
        if not words: return []
        root = {}
        for word in words:
            node = root
            for char in word:
                node = node.setdefault(char, {})
            node[self.END_OF_WORD] = self.END_OF_WORD

        for row in range(len(board)):
            for col in range(len(board[i])):
                if board[row][col] in root:
                    self._dfs(board, row, col, "", root)
        
        return self.result

    def _dfs(self, board, row, col, cur_word, cur_dict):
        cur_word += board[row][col]
        cur_dict = cur_dict[board[row][col]]
        if self.END_OF_WORD in cur_dict:
            self.result.append(cur_word)
        
        temp = board[row][col]
        board[row][col] = '@'
        m = len(board)
        n = len(board[0])
        for i in range(4):
            x = row + self.dx[i]
            y = col + self.dy[i]
            if x >= 0 and x < m and y >=0 and y < n and board[x][y] != '@' and (board[x][y] in cur_dict):
                self._dfs(board, x, y, cur_word, cur_dict);
        board[row][col] = temp
