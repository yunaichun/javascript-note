/** https://leetcode.cn/problems/permutation-in-string/ */
/** https://leetcode.cn/problems/MPnaiL/ */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  const elements = new Map();
  for (let char of s1) {
    if (elements.get(char)) elements.set(char, elements.get(char) + 1);
    else elements.set(char, 1);
  }
  let totalElements = elements.size;

  let [left, right] = [0, 0];
  for (; right < s2.length; right += 1) {
    const char = s2[right];
    if (elements.has(char)) {
      elements.set(char, elements.get(char) - 1);
      if (elements.get(char) === 0) totalElements -= 1;
    }
    for (; totalElements === 0; left += 1) {
      if (right - left + 1 === s1.length) return true;
      const char = s2[left];
      if (elements.has(char)) {
        elements.set(char, elements.get(char) + 1);
        if (elements.get(char) === 1) totalElements += 1;
      }
    }
  }

  return false;
};

s1 = "ab";
s2 = "eidboaoo";
console.log(checkInclusion(s1, s2));
