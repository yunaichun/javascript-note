/** 最小覆盖子串 */
/** https://leetcode.cn/problems/minimum-window-substring/ */
/** https://leetcode.cn/problems/M1oyTv/ */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (t.length > s.length) return "";

  const elements = new Map();
  for (let char of t) {
    if (elements.has(char)) elements.set(char, elements.get(char) + 1);
    else elements.set(char, 1);
  }
  let totalElemets = elements.size;

  console.log(1111, elements, totalElemets);
  let min = "";
  let [left, right] = [0, 0];
  /** 1、不断增加 right 使滑动窗口增大，直到窗口包含了 t 的所有元素 */
  for (; right < s.length; right += 1) {
    let char = s[right];
    if (elements.has(char)) {
      elements.set(char, elements.get(char) - 1);
      if (elements.get(char) === 0) totalElemets -= 1;
    }
    console.log(2222, elements, totalElemets);

    for (; totalElemets === 0; left += 1) {
      /** 2、包含所有元素之后记录结果 */
      const newMin = s.slice(left, right + 1);
      if (!min || newMin.length < min.length) min = newMin;

      /** 3、不断增加 left 使滑动窗口缩小，直到窗口包含了 t - 1 个元素 */
      const char = s[left];
      if (elements.has(char)) {
        elements.set(char, elements.get(char) + 1);
        if (elements.get(char) === 1) totalElemets += 1;
      }
      console.log(3333, elements, totalElemets);
    }
  }

  return min;
};

console.log(minWindow("AAABCAB", "ABCA"));
// console.log(minWindow("DOABECODEBANC", "ABC"));
// console.log(minWindow("aa", "aa"));
