class Solution:
    def __init__(self):
        super().__init__()
        

    def ladderLength(self, beginWord, endWord, wordList):
        step = self._bfs(beginWord, endWord, wordList);
        return step;

    def _bfs(self, beginWord, endWord, wordList):
        step = 1;
        queue = [beginWord];
        while len(queue):
            levelSize = queue.length;
            for i in range(levelSize):
                if queue[i] == endWord: return step
                for j in range(len(queue[i])):
                    for k in range(len(self.letters)):
                        newWord = queue[i][0:j] + self.letters[k] + queue[i][j + 1]
                        if newWord in wordList:
                            queue.append(newWord)
                            wordList.remove(newWord)
            queue = queue.slice(levelSize)
            step++
        return 0
