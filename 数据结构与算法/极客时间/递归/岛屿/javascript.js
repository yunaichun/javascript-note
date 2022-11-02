/** 上下左右 */
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let sum = 0;
  for (let i = 0, len1 = grid.length; i < len1; i += 1) {
    for (let j = 0, len2 = grid[i].length; j < len2; j += 1) {
      if (grid[i][j] === "1") {
        _helper(grid, i, j, [{ x: i, y: j }]);
        sum += 1;
      }
    }
  }
  return sum;
};

var _helper = function (grid, row, column, visited) {
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 0; i < 4; i += 1) {
    const x = dx[i] + row;
    const y = dy[i] + column;
    const isValid = x >= 0 && x < m && y >= 0 && y < n;
    const isVisited = visited.find((i) => i.x === x && i.y === y);
    if (!isValid || isVisited) continue;
    if (grid[x][y] === "1") {
      grid[x][y] = 0;
      _helper(grid, x, y, visited.concat({ x, y }));
    }
  }
};

grid = [
  ["1", "1", "1"],
  ["0", "1", "0"],
  ["0", "1", "0"],
];
console.log(numIslands(grid));
