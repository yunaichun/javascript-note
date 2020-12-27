// == leetcode: https://leetcode.com/problems/majority-element/
class Solution {
    // == 还有一个缺陷是未记录多个众位数
    constructor() {
    }
    // == 排序 o(nlog(n))
    // == Map: { x: count(x) }  => 空间和时间复杂度 o(n)
    // == 分治：o(nlog(2, n)) 左右
    majorityElement(nums) {
        // == 排序的目的是保证相同的数字不会被分割到2边
        nums = nums.sort();
        let length = nums.length;
        let mid = Math.floor(length/2);
        // == 终止条件
        if (length === 0) return null;
        if (length === 1) return nums[0];
        let left;
        let right;
        // == 中间左右两边一样的话要归为一类【length 为 2 防止死循环】
        if (nums[mid - 1] === nums[mid] && length !== 2) {
            left = this.majorityElement(nums.slice(0, mid + 1));
            right = this.majorityElement(nums.slice(mid + 1));
        } else {
            left = this.majorityElement(nums.slice(0, mid));
            right = this.majorityElement(nums.slice(mid)); 
        }
        // == 左边的众数 大于 右边的众数
        if (this.count(nums, left) > this.count(nums, right)) {
            if (this.count(nums, left) === 1) return null;
            else return left;
        } else {
            if (this.count(nums, right) === 1) return null;
            else return right;
        }
    }
    count(nums, num) {
        let count = 0;
        nums.forEach(item => {
            if (item === num) count++
        });
        return count;
    }
}
let test = new Solution()
console.log(test.majorityElement([3, 2, 1, 1, 1, 2, 2])) // 2
console.log(test.majorityElement([1, 2, 3])) // null
console.log(test.majorityElement([1, 2, 3, 3, 5, 6])) // 3


class Solution2 {
    constructor() {
    }
    // == 摩尔投票法 o(n)
    majorityElement(nums) {
        let candidate = nums[0];
        let iTimes = 1;
        for (let i = 1, len = nums.length; i < len; i++) {
            if (iTimes === 0) {
                candidate = nums[i];
                iTimes = 1;
            } else {
                // == 相同则加1，不同则抵消掉1个
                if (nums[i] === candidate) {
                    iTimes++;
                } else {
                    iTimes--;
                }
            }
            
        }
        return candidate;
    }
}
