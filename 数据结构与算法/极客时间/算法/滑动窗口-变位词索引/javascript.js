/** https://leetcode.cn/problems/find-all-anagrams-in-a-string/ */
/** https://leetcode.cn/problems/VabMRr/ */

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const elements = new Map();
  for (let char of p) {
    if (elements.has(char)) elements.set(char, elements.get(char) + 1);
    else elements.set(char, 1);
  }
  let totalElements = elements.size;

  const results = [];
  let [left, right] = [0, 0];
  for (; right < s.length; right += 1) {
    const char = s[right];
    if (elements.has(char)) {
      elements.set(char, elements.get(char) - 1);
      if (elements.get(char) === 0) totalElements -= 1;
    }
    for (; totalElements === 0; left += 1) {
      if (right - left + 1 === p.length) results.push(left);

      const char = s[left];
      if (elements.has(char)) {
        elements.set(char, elements.get(char) + 1);
        if (elements.get(char) === 1) totalElements += 1;
      }
    }
  }
  return results;
};

(s = "abab"), (p = "ab");
console.log(findAnagrams(s, p));
