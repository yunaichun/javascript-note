// leetcode: https://leetcode.com/problems/counting-bits/

// == 动态规划思想
class Solution {
    constructor() {
    }
    // == 动态规划思想
    countBits(num) {
        let bits = [0];
        for (let i = 1; i < num + 1; i++) {
            bits[i] = bits[i & (i - 1)] + 1;
        }
        return bits;
    }
}
