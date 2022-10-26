/** https://leetcode.cn/problems/3sum
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) return [];
  nums.sort();
  const results = [];
  for (let i = 0, len = nums.length; i < len - 2; i += 1) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let obj = {};
    /** 循环遍历第二个元素 */
    for (let j = i + 1; i < len; i += 1) {
      const one = nums[i];
      const two = nums[j];
      const three = 0 - one - two;
      /** 根据第二个元素确定第三个应该的元素 */
      if (!obj[two]) {
        obj[three] = { add: false };
      } else if (!obj[two].add) {
        obj[two] = { add: true };
        results.push([one, two, three]);
      }
    }
  }
  return results;
};
