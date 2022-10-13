/** https://leetcode.cn/problems/implement-trie-prefix-tree/
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
var Trie = function () {
  this.root = {};
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let root = this.root;
  for (let i = 0, len = word.length; i < len; i += 1) {
    const cur = word[i];
    if (!root[cur]) root[cur] = {};
    root = root[cur];
  }
  root["#"] = "#";
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let root = this.root;
  for (let i = 0, len = word.length; i < len; i += 1) {
    const cur = word[i];
    if (!root[cur]) return false;
    root = root[cur];
  }
  if (root["#"] === "#") return true;
  return false;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let root = this.root;
  for (let i = 0, len = prefix.length; i < len; i += 1) {
    const cur = prefix[i];
    if (!root[cur]) return false;
    root = root[cur];
  }
  return true;
};

const trie = new Trie();
trie.insert("apple");
trie.startsWith("app"); // 返回 True
trie.search("apple"); // 返回 True
trie.search("app"); // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app"); // 返回 True
