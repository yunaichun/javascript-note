/** https://leetcode.cn/problems/combination-sum-ii/ */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const results = [];
  candidates.sort();
  /** 1、递归树 */
  _helper(candidates, target, 0, [], results);
  return results;
};

var _helper = function (candidates, target, start, path, results) {
  /** 2、保存结果: 终止条件 */
  if (target < 0) return;
  if (target === 0) {
    const exist = results.find((i) => i.sort().join() === path.sort().join());
    if (!exist) results.push(path);
    return;
  }
  for (let i = start, len = candidates.length; i < len; i += 1) {
    /** 3、选择+递归+重置: 剪枝 */
    const current = candidates[i];
    if (i > start && candidates[i] == candidates[i - 1]) continue;
    path.push(current);
    /** 不能再终止条件的时候再做累加，多余步骤: 每次选择后 target 越来越少，相当于做了累加操作 */
    _helper(candidates, target - current, i + 1, [...path], results);
    path.pop();
  }
};

(candidates = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
]),
  (target = 30);
console.log(combinationSum2(candidates, target));
