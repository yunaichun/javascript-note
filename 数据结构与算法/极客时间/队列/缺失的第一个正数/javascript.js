/** https://leetcode.cn/problems/first-missing-positive/ */

/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  /** 哈希表: a[i - 1] = i */
  /** 极端情况: [1, 2, ... N], 最小的正整数 为 N + 1 */

  const N = nums.length;
  for (let i = 0; i < N; i += 1) {
    /** 把当前元素放在对应的位置上面去: nums[i] 应该放到 nums[nums[i] -1] 位置上面去 */
    while (nums[i] >= 1 && nums[i] <= N && nums[i] !== nums[nums[i] - 1]) {
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }

  for (let i = 0; i < N; i += 1) {
    if (nums[i] !== i + 1) return i + 1;
  }

  return N + 1;
};

nums = [3, 4, -1, 1];

console.log(firstMissingPositive(nums));
