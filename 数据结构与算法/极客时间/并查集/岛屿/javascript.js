// == leetcode: https://leetcode.com/problems/number-of-islands/
// == leetcode: https://leetcode.com/problems/friend-circles/
class Solution {
    constructor() {
        this.queue = [];
        this.visited = new Set();
        // == 横坐标：左、右、上、下
        this.dx = [-1, 1, 0, 0];
        // == 纵坐标：左、右、上、下
        this.dy = [0, 0, -1, 1];
    }
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    numIslands(grid) {
        for (let i = 0, row = grid.length; i < row; i++) {
            for (let j = 0, column = grid[i].length; j < column; j++) {
                this._dfs(grid, i, j);
            }
        }
        console.log(111111, grid);
        let sum = this._get_result(grid);
        return sum;
    }
    // == 深度优先 o(n)  -  染色
    _dfs(grid, row, column) {
        if (!this._is_valid(grid, row, column)) {
            return;
        }
        this.visited.add({row, column});
        for (let i = 0; i < 4; i++) {
            let newRow = row + this.dx[i];
            let newColumn = column + this.dy[i];
            if (this._is_valid(grid, newRow, newColumn)) {
                grid[row][column] = 0;
                this._dfs(grid, newRow, newColumn);
            }
        }
    }
    // == 广度优先 o(n)  -  染色
    _bfs(grid, row, column) { n
        if (!this._is_valid(grid, row, column)) {
            return;
        }
        this.visited.add({row, column});
        this.queue.push({row, column});
        while(this.queue.length) {
            let {row, column} = this.queue.pop();
            for (let j = 0; j < 4; j++) {
                let newRow = row + this.dx[j];
                let newColumn = column + this.dy[j];
                if (this._is_valid(grid, newRow, newColumn)) {
                    grid[row][column] = 0;
                    this.queue.push({row: newRow, column: newColumn});
                }
            }
        }
    }
    _is_valid(grid, row, column) {
        if (
            row < 0 || row >= grid.length ||
            column < 0 || column >= grid[0].length
        ) {
            return false;
        }
        for (let i of this.visited) {
            if (
                Number(grid[row][column]) === 0 ||
                (i.row === row && i.column === column)
            ) {
                return false;
            }
        }
        return true
    }
    _get_result(grid) {
        let sum = 0;
        for (let i = 0, row = grid.length; i < row; i++) {
            for (let j = 0, column = grid[i].length; j < column; j++) {
                sum += Number(grid[i][j]);
            }
        }
        return sum;
    }
}

var grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","1"]
];
// var grid = [[1,1,0],
// [1,1,0],
// [0,0,1]]
var a = new Solution();
console.log(a.numIslands(grid))
