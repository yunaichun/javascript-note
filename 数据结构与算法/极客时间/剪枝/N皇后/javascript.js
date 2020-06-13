// == leetcode-51: https://leetcode.com/problems/n-queens/
// == leetcode-52: https://leetcode.com/problems/n-queens-ii/
class Solution {
    constructor() {
        this.lie = [];
        this.pie = [];
        this.na = [];
        this.result = [];
    }
    /**
     * @param {number} n
     * @return {number}
     */
    totalNQueens(n) {
        this.result = [];
        this._dfs(n, 0, []);
        console.log(this.result);
        return this.result.length;
    }
    /**
     * @param {number} n
     * @return {string[][]}
     */
    solveNQueens(n) {
        this.result = [];
        this._dfs(n, 0, []);
        let res = this._generate_result(this.result, n);
        return res;
    }
    // == 深度优先 o(n)
    _dfs(n, row, cur_solve) {
        if (row === n) {
            // == cur_solve 是数组，要注意数组的额引用传递
            this.result.push(JSON.parse(JSON.stringify(cur_solve)));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (
                this.lie.indexOf(col) > -1 ||
                this.pie.indexOf(row + col) > -1 ||
                this.na.indexOf(row - col) > -1
            ) {
                continue;
            }
            cur_solve.push({row, col})
            // == 添加剪枝：当前行列被选择后下一行受影响的正方格
            this.lie.push(col);
            this.pie.push(row + col);
            this.na.push(row - col);
            // == 下一行
            this._dfs(n, row + 1, cur_solve);
            // == 下一行全部列走完之后，回归到当前行的下一列的时候，要将当前行列存储的信息清空
            this.lie.pop();
            this.pie.pop();
            this.na.pop();
            cur_solve.pop();
        }
    }
    _generate_result(data, n) {
        let res = data.map(item => {
            return item.map(item => {
                let str = '';
                for (let i = 0; i < n; i++) {
                    if (i === item.col) str += 'Q';
                    else str += '.';
                }
                return str;
            })
        });
        return res;
    }
}


var a = new Solution();
console.log(a.totalNQueens(4));
console.log(a.solveNQueens(4));
