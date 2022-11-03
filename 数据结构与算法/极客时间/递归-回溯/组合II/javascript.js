/** https://leetcode.cn/problems/combination-sum/ */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const results = [];
  /** 1、递归树 */
  _helper(candidates, target, [], results);
  return results;
};

var _helper = function (candidates, target, path, results) {
  /** 2、保存结果: 终止条件 */
  if (target < 0) return;
  if (target === 0) {
    const exist = results.find((i) => i.sort().join() === path.sort().join());
    if (!exist) results.push(path);
    return;
  }

  for (let i = 0, len = candidates.length; i < len; i += 1) {
    /** 3、选择+递归+重置: 剪枝 */
    const current = candidates[i];
    path.push(current);
    /** 不能再终止条件的时候再做累加，多余步骤: 每次选择后 target 越来越少，相当于做了累加操作 */
    _helper(candidates, target - current, [...path], results);
    path.pop();
  }
};

candidates = [8, 6, 4, 12, 5, 7, 3, 11];
target = 28;
console.log(combinationSum(candidates, target));
