/** https://leetcode.cn/problems/restore-ip-addresses/ */

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  let results = [];
  _helper(s, 0, [], results);
  return results;
};

var _helper = function (s, pos, path, results) {
  if (path.length === 4) {
    if (pos === s.length) {
      const exist = results.find((i) => i === path.join("."));
      if (!exist) results.push(path.join("."));
    }
    return;
  }
  for (let i = 1; i < 4; i += 1) {
    const char = s.slice(pos, pos + i);
    if (char.length > 1 && char[0] === "0") break;
    const isValid = char.length && Number(char) >= 0 && Number(char) <= 255;
    if (isValid) {
      _helper(s, pos + char.length, path.concat(char), results);
    }
  }
};
