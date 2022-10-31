/** https://leetcode.cn/problems/maximum-length-of-repeated-subarray/ */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
  /** dp[i][j] 代表 nums1[0:i] 和 nums2[0:j] 的最大"公共后缀"子数组长度 */
  /** 此题 dp 的定义保证了所求得的 dp 值反映了连续的子数组匹配，即 nums1[0:i] 和nums2[0:j] 的末尾部分是匹配的 */
  const dp = [];
  let res = 0;
  for (let i = 0; i <= nums1.length; i++) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0; j <= nums2.length; j++) {
      if (i === 0) {
        /** 空数组和任何数组的最最长公共子串长度的长度都是 0 */
        dp[i][j] = 0;
      } else if (j === 0) {
        dp[i][j] = 0;
      } else {
        if (nums1[i - 1] === nums2[j - 1]) {
          /** nums1 第 i 个元素和 nums2 第 j 个元素一样, 公共子串长度比前个序列加 1 */
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          /** 如果尾部不相等，表明没有公共后缀 */
          dp[i][j] = 0;
        }
        res = Math.max(res, dp[i][j]);
      }
    }
  }
  return res;
};

// (nums1 = [0, 0, 0, 0, 0]), (nums2 = [0, 0, 0, 0, 0]);
nums1 = [0, 1, 1, 1, 1];
nums2 = [1, 0, 1, 0, 1];
console.log(findLength(nums1, nums2));
