/** https://leetcode.com/problems/longest-increasing-subsequence/
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  /** a[i]: 代表数组第 i 序列时最长上升子序列长度 */
  /** a[i] = 如下判断 */
  const a = [];
  a[0] = 1;
  for (let i = 1, len = nums.length; i < len; i += 1) {
    if (!a[i]) a[i] = a[0];
    for (j = 0; j < i; j += 1) {
      if (nums[i] > nums[j]) a[i] = Math.max(a[j] + 1, a[i]);
    }
  }
  return Math.max.apply(null, a)
};
