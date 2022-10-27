/** https://leetcode.cn/problems/compare-version-numbers/ */

/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  version1 = normalizeVersion(version1);
  version2 = normalizeVersion(version2);
  let i = 0;
  let j = 0;
  while (i < version1.length || j < version2.length) {
    const a = version1[i] || 0;
    const b = version2[j] || 0;
    if (a === b) {
      i += 1;
      j += 1;
    } else if (a > b) {
      return 1;
    } else {
      return -1;
    }
  }
  return 0;
};

var normalizeVersion = function (version) {
  const arr = version.split(".");
  return arr.map((i) => {
    return (`0.${i}` - "0") * Math.pow(10, i.length);
  });
};
