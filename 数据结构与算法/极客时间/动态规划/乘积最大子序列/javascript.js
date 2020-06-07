// == leetcode: https://leetcode.com/problems/maximum-subarray/
class Solution {
    constructor(props) {
    }
    // == 第一步：定义状态：a[i][0] 代表以第 i 个元素结尾且乘积最大的连续子数组、
    // ==                a[i][1] 代表以第 i 个元素结尾且乘积最小的连续子数组
    // == 第二步：状态转移方程：if (nums[i] > 0) a[i][0] = a[i - 1][0] * nums[i]
    // ==                    else            a[i][1] = a[i - 1][1] * nums[i]
    // ==                    MAX = Math.max(a[i][0], a[i][1])
    // == 初始状态：MAX = a[0] = nums[0]
    // == 求 MAX
    maxProduct(nums) {
        let a = [[nums[0], nums[0]]];
        let MAX = nums[0];
        for (let i = 1, len = nums.length; i < len; i++) {
            a[i] = [];
            if (nums[i] > 0) {
                a[i][0] = a[i - 1][0] * nums[i];
                a[i][1] = a[i - 1][1] * nums[i];
            } else {
                a[i][0] = a[i - 1][1] * nums[i];
                a[i][1] = a[i - 1][0] * nums[i];
            }
            MAX = Math.max(a[i][0], MAX);
        }
        return MAX;
    }
}
