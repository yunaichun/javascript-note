/** https://leetcode.cn/problems/trapping-rain-water/ */

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  if (!height.length) return 0;
  const len = height.length;
  /** leftMax[i] 代表第 i + 1 位置及其左边最大的值 */
  const leftMax = [height[0]];
  for (let i = 1; i < len; i += 1) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }
  /** rightMax[i] 代表第 i + 1 位置及其右边最大的值 */
  const rightMax = [];
  rightMax[len - 1] = height[len - 1];
  for (let i = len - 2; i >= 0; i -= 1) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  /** dp[i] 代表第 i + 1 位置能接的雨水数量 */
  const dp = [];
  for (let i = 0; i < len; i += 1) {
    dp[i] = Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return dp.reduce((a, b) => a + b);
};
