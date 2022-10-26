/** https://leetcode.cn/problems/binary-search/ */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let [min, max] = [0, nums.length];
  while (true) {
    if (max - min === 1 && nums[min] !== target && nums[max] !== target)
      return -1;
    const mid = Math.floor((min + max) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) min = mid;
    else max = mid;
  }
};
