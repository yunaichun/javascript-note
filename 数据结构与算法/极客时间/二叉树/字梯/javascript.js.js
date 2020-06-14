// == leetcode: https://leetcode.com/problems/word-ladder/
class Solution {
    constructor() {
        this.letters = 'abcdefghijklmnopqrstuvwxyz';
    }
    /**
     * @param {string} beginWord
     * @param {string} endWord
     * @param {string[]} wordList
     * @return {number}
     */
    ladderLength(beginWord, endWord, wordList) {
        let step = this._bfs(beginWord, endWord, wordList);
        return step;
    }
    // == 广度优先 o(n)
    _bfs(beginWord, endWord, wordList) {
        const dict = new Set(wordList);
        let step = 1;
        let queue = [beginWord];
        while (queue.length) {
            let levelSize = queue.length;
            // == 遍历当前 level 所有单词
            for (let i = 0; i < levelSize; i++) {
                if (queue[i] === endWord) return step;
                // == 对当前 level 上每个单词的每一位做变换
                for (let j = 0; j < queue[i].length; j++) {
                    // == 每一位都可以变换为 26 个英文字母的一项
                    for (let k = 0; k < this.letters.length; k++) {
                        const newWord = queue[i].slice(0, j) + this.letters[k] + queue[i].slice(j + 1);
                        // == 在下一步如果还能够变换到同一层级的单词，相当于会再多走一步
                        if (dict.has(newWord)) {
                            queue.push(newWord);
                            dict.delete(newWord);
                        }
                    }
                }
            }
            queue = queue.slice(levelSize);
            step++;
        }
        return 0;
    }
}

var a = new Solution();
var beginWord = 'hit';
var endWord = 'cog';
var wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];
console.log(a.ladderLength(beginWord, endWord, wordList));
