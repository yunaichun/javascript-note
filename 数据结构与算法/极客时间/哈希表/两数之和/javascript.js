// == https://leetcode.com/problems/two-sum/
class Solution {
    constructor() {
    }
    // o(n)
    twoSum(nums, target) {
        for (let i = 0, len = nums.length; i < len; i++) {
            let index = nums.indexOf(target - nums[i]);
            if (index > -1) {
                return [i, index]
            }
        }
    }
}
