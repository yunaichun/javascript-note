// == leetcode: https://leetcode.com/problems/sqrtx/
class Solution {
    constructor(props) {
    }
    // == o(log(2, x))
    mySqrt(x) {
        let min = 0;
        let max = x;
        while (true) {
            let mid = Math.floor((min + max)/2)
            if (mid*mid < x) {
                min = mid;
            } else if (mid*mid > x) {
                max = mid;
            } else {
                return mid;
            }
        }
    }
}

