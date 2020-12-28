// == leetcode: https://leetcode.com/problems/longest-increasing-subsequence/
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：a[i] 代表以第 i 个元素结尾最长上升子序列的长度
    // == 第二步：状态转移方程：if (nums[j] < nums[i]) a[i] = Math.max(a[i], a[j] + 1)
    // == 初始状态：MAX = a[0] = 1
    // == 求 MAX
    lengthOfLIS(nums) {
        let a = [];
        let MAX = a[0] = 1;
        for (let i = 1, len = nums.length; i < len; i++) {
            // == 因为是不连续，所以要全部比较【类似零钱兑换】
            for (j = 0; j < i; j++) {
                if (a[i]) {
                    if (nums[j] < nums[i]) a[i] = Math.max(a[i], a[j] + 1);
                } else {
                    // == 相当于初始化，在下一步会被对比的
                    a[i] = a[j];
                }
            }
            MAX = Math.max(a[i], MAX);
        }
        return MAX;
    }
}
