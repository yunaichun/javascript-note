// == leetcode: https://leetcode.com/problems/maximum-subarray/
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：a[i] 代表以第 i 个元素结尾且和最大的连续子数组
    // == 第二步：状态转移方程：a[i] = Math.max(a[i - 1] + nums[i], nums[i]);
    // == 初始状态：MAX = a[0] = nums[0]
    // == 求 MAX
    maxSubArray(nums) {
        let a = [];
        let MAX = a[0] = nums[0];
        for (let i = 1, len = nums.length; i < len; i++) {
            a[i] = Math.max(a[i - 1] + nums[i], nums[i]);
            MAX = Math.max(a[i], MAX);
        }
        return MAX;
    }
}
