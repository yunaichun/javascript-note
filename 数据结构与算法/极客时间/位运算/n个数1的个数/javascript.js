// leetcode: https://leetcode.com/problems/counting-bits/
class Solution {
    constructor() {
    }
    /**
     * @param {number} num
     * @return {number[]}
     */
    countBits(num) {
        let bits = [0];
        for (let i = 1; i < num + 1; i++) {
            bits[i] = bits[i & (i - 1)] + 1;
        }
        return bits;
    }
}
