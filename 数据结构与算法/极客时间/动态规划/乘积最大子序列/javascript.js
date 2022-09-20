/** https://leetcode.com/problems/maximum-product-subarray/
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  /** a[i]: 代表数组第 i 序号最大积的连续子数组最小和最大 */
  /** a[i][0] = Math.min(a[i - 1][0] * nums[i], a[i - 1][1] * nums[i], nums[i]); */
  /** a[i][1] = Math.max(a[i - 1][0] * nums[i], a[i - 1][1] * nums[i], nums[i]); */
  const a = [];
  a[0] = [[nums[0], nums[0]]];
  for (let i = 1, len = nums.length; i < len; i += 1) {
    if (!a[i]) a[i] = [];
    a[i][0] = Math.min(a[i - 1][0] * nums[i], a[i - 1][1] * nums[i], nums[i]);
    a[i][1] = Math.max(a[i - 1][0] * nums[i], a[i - 1][1] * nums[i], nums[i]);
  }
  return Math.max.apply(null, a.reduce((a, b) => a.concat(b)));
};