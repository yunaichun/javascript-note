/**  https://leetcode.com/problems/majority-element/
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
  const map = new Map();
  for(let i = 0, len = nums.length; i < len; i += 1) {
    const count = map.get(nums[i]);
    if (count) map.set(nums[i], count + 1);
    else map.set(nums[i], 1);
  }
  const keys = [...map.keys()];
  const values = [...map.values()];
  const maxCount = Math.max.apply(null, values);
  const maxCountKey = keys.find(key => map.get(key) === maxCount);
  return maxCountKey;
};

/** 摩尔投票法 o(n) */
var majorityElement2 = function(nums) {
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
}

console.log(majorityElement2([1, 2, 1]));
