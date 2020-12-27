// == https://leetcode.com/problems/three-sum/
class Solution {
    constructor() {
    }
    // o(n2)
    threeSum(nums) {
        if (nums.length < 3) return [];
        // == 排序是关键: [-1, -1, -4, 0, 1, 2]
        nums.sort();
        let res = [];
        for (let i = 0, len = nums.length; i < len - 2; i++) {
            // == 避免重复
            if (i >= 1 && nums[i] == nums[i -1]) continue;
            // == 主要目的是记录匹配的第三个元素
            let d = {};
            for (let j = i + 1; j < len; j++) {
                let [m, n] = [nums[i], nums[j]];
                // == 确定出第三个值应该是什么
                if (!d[n]) {
                    d[-m-n] = 1;
                } else {
                    res.push([m, -m-n, n]);
                }
            }
        }
        return res;
    }
}

let nums = [-1, 0, 1, 2, -1, -4]
test = new Solution()
test.threeSum(nums)
