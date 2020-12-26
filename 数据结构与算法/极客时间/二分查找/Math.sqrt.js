// == leetcode: https://leetcode.com/problems/sqrtx/
class Solution {
    constructor() {
    }
    // == o(log(2, x))
    mySqrt(x) {
        let [min, max] = [0, x];
        while (true) {
            let mid = Math.round((min + max)/2);
            const midPow2 = mid * mid;
            if (midPow2 === x) {
                return mid;
            } else if (min + 1 === max) {
                return min;
            } else if (midPow2 < x) {
                min = mid;
            } else if (midPow2 > x) {
                max = mid;
            }
        }
    }
}
var a = new Solution()
console.log(a.mySqrt(1))
console.log(a.mySqrt(8))
console.log(a.mySqrt(9))