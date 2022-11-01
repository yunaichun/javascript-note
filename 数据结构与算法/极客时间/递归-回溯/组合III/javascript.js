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
  if (target < 0) return;
  /** 2、把每一条路径加入结果集: 判断是否有结束条件 */
  if (target === 0) {
    const exist = results.find((i) => i.sort().join() === path.sort().join());
    if (!exist) results.push(path);
    return;
  }
  for (let i = start, len = candidates.length; i < len; i += 1) {
    const current = candidates[i];
    if (i > start && candidates[i] == candidates[i - 1]) continue;
    path.push(current);
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
