class Trie:
    def __init__(self):
        super().__init__()

    def insert(self, word):
        node = this.root;
        for char in word:
            node = node.setdefault(char, {})
        node[self.end_of_word] = self.end_of_word

    def search(self, word):
        node = this.root;
        for char in word:
            if char not in node:
                return False
            node = node[char]
        return self.end_of_word in node

    def startsWith(self, prefix):
        node = this.root;
        for char in word:
            if char not in node:
                return False
            node = node[char]
        return True

test = {};
test.setdefault('a', {})
print(test)
print(test.get('a'))
print(test['a'])
print(test.get('b')) # None
print(test['b']) # KeyError: 'b'
