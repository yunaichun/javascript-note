/** https://leetcode.cn/problems/shortest-supersequence-lcci/ */

/**
 * @param {number[]} big
 * @param {number[]} small
 * @return {number[]}
 */
var shortestSeq = function (big, small) {
  if (small.length > big.length) return [];
  const elements = new Map();
  for (let ele of small) {
    if (elements.has(ele)) elements.set(ele, elements.get(ele) + 1);
    else elements.set(ele, 1);
  }
  let totalElemets = elements.size;

  let min = [];
  let [left, right] = [0, 0];
  /** 1、不断增加 right 使滑动窗口增大，直到窗口包含了 t 的所有元素 */
  for (; right < big.length; right += 1) {
    const ele = big[right];
    if (elements.has(ele)) {
      elements.set(ele, elements.get(ele) - 1);
      if (elements.get(ele) === 0) totalElemets -= 1;
    }

    for (; totalElemets === 0; left += 1) {
      /** 2、包含所有元素之后记录结果 */
      if (!min.length || right - left < min[1] - min[0]) min = [left, right];
      /** 3、不断增加 left 使滑动窗口缩小，直到窗口包含了 t - 1 个元素 */
      const ele = big[left];
      if (elements.has(ele)) {
        elements.set(ele, elements.get(ele) + 1);
        if (elements.get(ele) === 1) totalElemets += 1;
      }
    }
  }

  return min;
};

big = [
  878982, 143504, 268583, 394343, 849567, 257687, 352256, 35131, 663529, 543027,
];
small = [143504];

console.log(shortestSeq(big, small));
