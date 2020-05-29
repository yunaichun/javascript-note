// == leetcode: https://leetcode.com/problems/powx-n/
class Solution {
    constructor(props) {
        super(props)
    }
    // == log(2, n)
    myPow(x, n) {
        if (n === 0) return 1;
        if (n < 0) return 1 / this.myPow(x, -n);
        if (n % 2 === 0) {
            return this.myPow(x*x, n/2);
        } else {
            return x * this.myPow(x, n - 1);
        }
    }
}

class Solution2 {
    constructor(props) {
        super(props)
    }
    // == 动态规划 log(n)
    myPow(x, n) {
        let arr = [1]
        for (let i = 1; i < n + 1; i++) {
            arr[i] = arr[i - 1] * x
        }
        return arr[n];
    }
}

// == 位运算求解
class Solution3 {
    constructor(props) {
        super(props)
    }
    // == 动态规划 log(n)
    myPow(x, n) {
        if (n < 0) {
            x = 1/ x;
            n = -n;
        }
        let pow = 1;
        // == 7 的二进制表示为 111
        // == 7 = 1 + 2 + 4
        // == Math.pow(2, 0) + Math.pow(2, 1) + Math.pow(2, 2)
        while (n) {
            if (n & 1) pow = pow*x;
            // == x、x二次方、x四次方
            x = x*x;
            n >>= 1;
        }
        return pow;
    }
}
