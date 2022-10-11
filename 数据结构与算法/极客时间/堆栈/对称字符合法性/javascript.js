// == leetcode: https://leetcode.cn/problems/valid-parentheses/
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  const map = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']']
  ]);
  for (let i = 0, len = s.length; i < len; i += 1) {
    const isLeft = map.has(s[i]);
    if (isLeft) {
      stack.push(s[i]);
    } else {
      if (!stack.length) return false;
      const last = stack[stack.length - 1];
      if (map.get(last) !== s[i]) return false;
      else stack.pop();
    }
  }
  return !stack.length;
};
s = "(])"
console.log(isValid(s));
