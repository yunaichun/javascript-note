class Solution:
    def __init__(self):
        super().__init__()
        self.lie = []
        self.pie = []
        self.na = []
        self.result = []

    def solveNQueens(self, n):
        self.result = []
        self._dfs(n, 0, [])
        res = self._generate_result(self.result, n)
        return res
    
    def _dfs(self, n, row, cur_solve):
        if row == n:
            self.result.append(cur_solve);
            return
        for col in range(n):
            if col in self.lie or (row + col) in self.pie or (row - col)  in self.na:
                continue
            cur_solve.append({"row": row, "col": col})
            self.lie.append(col)
            self.pie.append(row + col)
            self.na.append(row - col)
            self._dfs(n, row + 1, cur_solve)
            self.lie.pop()
            self.pie.pop()
            self.na.pop()
            cur_solve.pop()
    
    def _generate_result(self, data, n):
        def f(item):
            str1 = '';
            for i in range(n):
                if i == item.get('col'):
                    str1 += 'Q'
                else:
                    str1 += '.'
            return str1
        res = list(map(lambda x: list(map(f, x)), data))
        return res


data = [ 
    [ 
        { "row": 0, "col": 1 },
        { "row": 1, "col": 3 },
        { "row": 2, "col": 0 },
        { "row": 3, "col": 2 }
    ],
    [ 
        { "row": 0, "col": 2 },
        { "row": 1, "col": 0 },
        { "row": 2, "col": 3 },
        { "row": 3, "col": 1 }
    ]
]
def f(item):
    str1 = '';
    for i in range(4):
        if i == item.get('col'):
            str1 += 'Q'
        else:
            str1 += '.'
    return str1
res = list(map(lambda x: list(map(f, x)), data))
print(res)
