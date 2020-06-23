// leetcode: https://leetcode.com/problems/power-of-two/
class Solution {
    constructor() {
    }
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfTwo(n) {
        return n > 0 && !(n & (n - 1));
    }
}
