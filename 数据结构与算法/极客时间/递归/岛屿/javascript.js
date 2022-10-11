/** 上下左右 */
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

/** https://leetcode.cn/problems/number-of-islands/
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  let sum = 0;
  for (let i = 0, row = grid.length; i < row; i += 1) {
    for (let j = 0, column = grid[i].length; j < column; j += 1) {
      if (Number(grid[i][j]) === 1) {
        _helper(grid, i, j, [{ x: i, y: j }]);
        sum++;
      }
    }
  }
  console.log(grid);
  return sum;
};

var _helper = function(grid, row, column, visited) {
  let m = grid.length;
  let n = grid[0].length;
  for (let i = 0; i < 4; i++) {
    let x = row + dx[i];
    let y = column + dy[i];
    const inVisited = visited.find(i => i.x === x && i.y === y);
    const inBoard = x >= 0 && x < m && y >= 0 && y < n;
    if (!inVisited && inBoard) {
      if (Number(grid[x][y]) === 1) {
        /** 开始消 1 附近（上下左右）的 1 */
        grid[x][y] = 0;
        _helper(grid, x, y, visited.concat({ x, y }));
      }
    }
  }
}

// grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ];

grid = [
  ["1","1","1"],
  ["0","1","0"],
  ["0","1","0"]
];
console.log(numIslands(grid));
