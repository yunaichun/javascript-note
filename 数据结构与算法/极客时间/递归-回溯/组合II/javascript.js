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
  if (target < 0) return;
  /** 2、把每一条路径加入结果集: 判断是否有结束条件 */
  if (target === 0) {
    const exist = results.find((i) => i.sort().join() === path.sort().join());
    if (!exist) results.push(path);
    return;
  }
  for (let i = 0, len = candidates.length; i < len; i += 1) {
    const current = candidates[i];
    path.push(current);
    _helper(candidates, target - current, [...path], results);
    path.pop();
  }
};

// (candidates = [2, 3, 6, 7]), (target = 7);
(candidates = [2, 3, 5]), (target = 8);
console.log(combinationSum(candidates, target));
