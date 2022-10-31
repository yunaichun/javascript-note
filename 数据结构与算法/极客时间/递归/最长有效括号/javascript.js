/** https://leetcode.cn/problems/longest-valid-parentheses/ */

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  /** 存入当前下标 index */
  const stack = [-1];
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      /** 遇到左括号 '(' 进栈*/
      stack.push(i);
    } else {
      /** 遇到右括号 ')' 将 '(' 出栈 */
      stack.pop();
      if (stack.length === 0) {
        /** 已经全部出栈之后，进来一个新的右括号 ')' 位置记录 */
        stack.push(i);
      } else {
        /** stack 最后一个元素为 ')' 的位置 */
        /** i - stack[stack.length - 1 值为消掉的元素数量 */
        res = Math.max(res, i - stack[stack.length - 1]);
      }
    }
  }
  return res;
};

s = "())((())";
console.log(longestValidParentheses(s));
