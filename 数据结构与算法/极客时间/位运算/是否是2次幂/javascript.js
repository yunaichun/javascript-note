// leetcode: https://leetcode.com/problems/power-of-two/
class Solution {
    constructor() {
    }
    // == 清除最低位1: x&(x - 1)
    // == 仅有 1 个 1
    isPowerOfTwo(n) {
        return n > 0 && !(n & (n - 1));
    }
}
