/** https://leetcode.com/problems/generate-parentheses */

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let results = [];
  _helper(n, 0, 0, "", results);
  return results;
};

var _helper = function (n, leftUsed, rightUsed, cur, results) {
  if (leftUsed === n && rightUsed === n) {
    results.push(cur);
    return;
  }
  if (leftUsed < n) {
    _helper(n, leftUsed + 1, rightUsed, cur + "(", results);
  }
  if (rightUsed < n && rightUsed < leftUsed) {
    _helper(n, leftUsed, rightUsed + 1, cur + ")", results);
  }
};
