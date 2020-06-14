// == leetcode-79: https://leetcode.com/problems/word-search/
// == leetcode-212: https://leetcode.com/problems/word-search-ii/
class Solution {
    constructor() {
        this.result = [];
        this.END_OF_WORD = '#';
        // == 横坐标：左、右、上、下
        this.dx = [-1, 1, 0, 0];
        // == 纵坐标：左、右、上、下
        this.dy = [0, 0, -1, 1];
    }
    /**
     * @param {character[][]} board
     * @param {string} word
     * @return {boolean}
     */
    exist(board, word) {
        let result = this.findWords(board, [word]);
        return result.length;
    }
    /**
     * @param {character[][]} board
     * @param {string[]} words
     * @return {string[]}
     */
    findWords(board, words) {
        if (!board.length || !board[0].length) return [];
        if (!words) return [];
        // == 构建 Trie 树
        let root = {};
        for (let i = 0, len = words.length; i < len; i++) {
            let node = root;
            for (let j = 0, len = words[i].length; j < len; j++) {
                if (!node[words[i][j]]) node[words[i][j]] = {}
                node = node[words[i][j]]
            }
            node[this.END_OF_WORD] = this.END_OF_WORD;
        }
        // == 深度递归
        for (let row = 0, len = board.length; row < len; row++) {
            for (let col = 0, len = board[row].length; col < len; col++) {
                if (board[row][col] in root) {
                    this._dfs(board, row, col, "", root);
                }
            }
        }
        return this.result;             
    }
    // == 深度优先 o(n)
    _dfs(board, row, col, cur_word, cur_dict) {
        cur_word += board[row][col];
        cur_dict = cur_dict[board[row][col]];
        if (this.END_OF_WORD in cur_dict) {
            this.result.push(cur_word);
        }
        let temp = board[row][col];
        board[row][col] = '@';
        let m = board.length;
        let n = board[0].length;
        // == 横坐标与纵坐标进行左右上下变换
        for (let i = 0; i < 4; i++) {
            let x = row + this.dx[i];
            let y = col + this.dy[i];
            if (
                x >= 0 && x < m &&
                y >=0 && y < n &&
                board[x][y] !== '@' &&
                (board[x][y] in cur_dict)
            ) {
                this._dfs(board, x, y, cur_word, cur_dict); 
            }
        }
        board[row][col] = temp;
    }
}

let board = [
    ["o","a","a","n"],
    ["e","t","a","e"],
    ["i","h","k","r"],
    ["i","f","l","v"]
]
let words = ["oath","pea","eat","rain"]
let a = new Solution()
console.log(a.findWords(board, words));
