/** https://leetcode.cn/problems/n-queens/ */
/** https://leetcode.cn/problems/n-queens-ii/ */

/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  const results = [];
  /** 1、递归树 */
  _helper(n, [], [], results);
  return results.length;
};

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const results = [];
  /** 1、递归树 */
  _helper(n, [], [], results);
  return results;
};

var _helper = function (n, visited, path, results) {
  /** 2、保存结果: 终止条件 */
  if (path.length === n) {
    results.push(path);
    return;
  }

  for (let i = 0; i < n; i += 1) {
    /** 3、选择+递归+重置: 剪枝 */
    const row = path.length;
    const column = i;
    const char = _generate(n, i);
    const isValid = _isValid(visited, row, column);
    if (!isValid) continue;
    path.push(char);
    visited.push({ row, column });
    _helper(n, [...visited], [...path], results);
    path.pop();
    visited.pop();
  }
};

var _generate = function (n, pos) {
  let char = "";
  for (let i = 0; i < n; i += 1) {
    if (i === pos) char += "Q";
    else char += ".";
  }
  return char;
};

var _isValid = function (visited, row, column) {
  const exist = visited.find((i) => {
    /** 存在相同行 */
    if (i.row === row) return true;
    /** 存在相同列 */
    if (i.column === column) return true;
    /** 捺上存在 */
    if (i.row - i.column === row - column) return true;
    /** 撇上存在 */
    if (i.row + i.column === row + column) return true;
    return false;
  });
  if (exist) return false;
  return true;
};

console.log(solveNQueens(4));
