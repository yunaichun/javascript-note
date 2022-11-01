/**  https://leetcode.com/problems/majority-element/
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const map = new Map();
  let [maxCount, maxNum] = [0, null];
  for (let i = 0, len = nums.length; i < len; i++) {
    if (map.has(nums[i])) map.set(nums[i], map.get(nums[i]) + 1);
    else map.set(nums[i], 1);
    const currentCount = map.get(nums[i]);
    if (currentCount > maxCount) {
      maxCount = currentCount;
      maxNum = nums[i];
    }
  }
  return maxNum;
};

/** 摩尔投票法 o(n) */
var majorityElement2 = function (nums) {
  let candidate = nums[0];
  let iTimes = 1;
  for (let i = 1, len = nums.length; i < len; i += 1) {
    if (iTimes === 0) {
      candidate = nums[i];
      iTimes = 1;
    } else {
      /** 相同则加1，不同则抵消掉1个 */
      if (nums[i] === candidate) iTimes += 1;
      else iTimes -= 1;
    }
  }
  return candidate;
};

console.log(majorityElement2([1, 2, 1]));
