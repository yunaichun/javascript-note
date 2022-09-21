/** https://leetcode.com/problems/generate-parentheses
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  return _helper(0, 0, n, '', []);
};

function _helper(leftUsed, rightUsed, n, current, result) {
  if (leftUsed === n && rightUsed === n) {
    result.push(current);
    return;
  }
  if (leftUsed < n) {
    _helper(leftUsed + 1, rightUsed, n, current + '(', result);
  }
  if (rightUsed < n && rightUsed < leftUsed) {
    _helper(leftUsed, rightUsed + 1, n, current + ')', result);
  }
  return result;
}
