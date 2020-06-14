// == leetcode-208: https://leetcode.com/problems/implement-trie-prefix-tree/
class Trie {
    constructor() {
        this.root = {};
        this.end_of_word = '#';
    }
    /**
     * Inserts a word into the trie. 
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let node = this.root;
        for (let i in word) {
            if (!node[word[i]]) node[word[i]] = {};
            node = node[word[i]];
        }
        node[this.end_of_word] = this.end_of_word;
    }
    /**
     * Returns if the word is in the trie. 
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let node = this.root;
        for (let i in word) {
            if (!node[word[i]]) return false;
            node = node[word[i]];
        }
        return this.end_of_word in node;
    }
    /**
     * Returns if there is any word in the trie that starts with the given prefix. 
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let node = this.root;
        for (let i in prefix) {
            if (!node[prefix[i]]) return false;
            node = node[prefix[i]];
        }
        return true;
    }
}

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

let trie = new Trie();

trie.insert('apple');
console.log(trie.search('apple'));  // returns true
console.log(trie.search('app'));     // returns false
console.log(trie.startsWith('app')); // returns true
trie.insert('app');
console.log(trie.search('app'));     // returns true
