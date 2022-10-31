/** https://leetcode.cn/problems/sliding-window-maximum/ */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow(nums, k) {
  if (k === 1) return nums;
  const deQueue = [];
  const results = [];
  for (let right = 0, len = nums.length; right < len; right += 1) {
    const current = nums[right];
    /** deQueue 维护一个单调递减队列 */
    while (deQueue.length && current > deQueue[deQueue.length - 1]) {
      deQueue.pop();
    }
    deQueue.push(current);
    console.log(1111, deQueue);

    const left = right - k + 1;
    if (left >= 0) {
      results.push(deQueue[0]);
      /** 滑动过程中，窗口内最左边元素是单调递减队列最大值的话，则移除 */
      if (nums[left] === deQueue[0]) deQueue.shift();
    }
    console.log(2222, deQueue);
  }
  return results;
}

nums = [3, 1, 2, 4, 2, 1];
k = 3;
console.log(maxSlidingWindow(nums, k));
