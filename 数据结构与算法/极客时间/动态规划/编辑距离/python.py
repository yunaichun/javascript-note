import math

class Solution:
    def __init__(self):
        super().__init__()

    def minDistance(self, word1, word2):
        m = word1.length;
        n = word2.length;
        a = [];
        for i in range(m + 1):
            a[i] = []
            for j in range(n + 1):
                if i == 0 or j == 0:
                    a[i][j] = 0
                else:
                    a[i][j] = Math.min(a[i -1][j], a[i][j - 1], a[i - 1][j - 1]) + 1
        return a[m][n]
