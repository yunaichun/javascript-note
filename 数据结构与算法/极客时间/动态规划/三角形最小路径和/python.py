import math

class Solution:
    def __init__(self):
        super().__init__()

    def minimumTotal(self, triangle):
        m = len(triangle)
        a = []
        a[m - 1] =  triangle[m - 1]
        for i in range(m - 2, -1, -1):
            currentLine = triangle[i]
            a[i] = []
            for j in range(0, len(currentLine)):
                a[i][j] = math.min(a[i + 1][j] , a[i + 1][j + 1]) + currentLine[j]
        return a[0][0]
