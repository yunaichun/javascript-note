// == leetcode: https://leetcode.com/problems/majority-element/
class Solution {
    constructor(props) {
    }
    generateParenthesis(n) {
        let result = this._helper(0, 0, n, "", []);
        return result;
    }
    _helper(leftUsed, rightUsed, n, current = "", result = []) {
        if (leftUsed === n && rightUsed === n) {
            result.push(current);
            return;
        }
        if (leftUsed < n) {
            this._helper(leftUsed + 1, rightUsed, n, current + '(', result);
        }
        if (rightUsed < n && rightUsed < leftUsed) {
            this._helper(leftUsed, rightUsed + 1, n, current + ')', result)
        }
        return result;
    }
}
