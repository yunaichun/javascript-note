class Solution:
    def __init__(self):
        super().__init__()

    def numIslands(self, grid):
        if not grid or not grid[0]:
            return 0
        self.max_x = len(grid); self.max_y = len(grid[0]); self.grid = grid
        self.visited = set()
        return sum([self.floodfill_dfs(i, j) for i in range(max_x) for j in range(max_y)])
    
    def floodfill_dfs(self, x, y):
        if not self._is_vaild(x, y):
            return 0
        self.visited.add((x, y))
        for k in range(4):
            self.floodfill_dfs(x + self.dx[k], y + self.dy[k])
        return 1

    def _is_vaild(self, x, y):
        if x < 0 or x > self.max_x or y <0 or y > self.max_y:
            return False
        if (x, y) in self.visited or self.grid[x][y] == '0':
            return False
        return True
