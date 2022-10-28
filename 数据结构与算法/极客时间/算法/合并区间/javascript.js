/** https://leetcode.cn/problems/merge-intervals/ */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  for (let i = 0, len = intervals.length; i < len - 1; i += 1) {
    for (j = i + 1; j < len; j += 1) {
      const interval1 = intervals[i];
      const interval2 = intervals[j];
      const merged = _helper(interval1, interval2);
      if (merged.length === 1) {
        intervals.splice(i, 1, ...merged);
        intervals.splice(j, 1);
        i = 0;
        j = 0;
        len = intervals.length;
      }
    }
  }
  return intervals;
};

var _helper = function (interval1, interval2) {
  const [x1, y1] = interval1;
  const [x2, y2] = interval2;
  if (y1 >= x2 && y1 <= y2) return [[Math.min(x1, x2), y2]];
  if (y2 >= x1 && y2 <= y1) return [[Math.min(x1, x2), y1]];
  return [interval1, interval2];
};
