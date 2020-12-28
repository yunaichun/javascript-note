// leetcode: https://leetcode.com/problems/number-of-1-bits
class Solution {
    constructor() {
    }
    // == 清除最低位1: x&(x - 1)
    hammingWeight(n) {
        let count = 0;
        while(n) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }
}
