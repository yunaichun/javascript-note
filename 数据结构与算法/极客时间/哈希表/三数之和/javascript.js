/** https://leetcode.cn/problems/3sum
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) return [];
  nums.sort();
  let results = [];
  for (let i = 0, len = nums.length; i < len - 2; i++) {
    if (i >= 1 && nums[i] === nums[i - 1]) continue;
    const thirdMap = {};
    for (let j = i + 1; j < len; j++) {
      const [m, n] = [nums[i], nums[j]];
      /** 记录第三个元素的值应该是多少 */
      if (!thirdMap[n]) {
        thirdMap[-m - n] = { add: false };
      } else if (!thirdMap[n].add) {
        thirdMap[n] = { add: true };
        results.push([m, -m - n, n]);
      }
    }
  }
  return results;
};
