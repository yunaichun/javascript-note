/** https://leetcode.cn/problems/merge-k-sorted-lists/ */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  let list = [];
  for (let i = 0, len = lists.length; i < len; i += 1) {
    let current = lists[i];
    while (current) {
      list.push(current);
      current = current.next;
    }
  }
  list = list.sort((a, b) => a.val - b.val);
  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  for (let i = 0, len = list.length; i < len; i += 1) {
    const node = list[i];
    if (i === 0) dynamicHead.next = node;
    prev.next = node;
    node.next = null;
    prev = node;
  }
  return dynamicHead.next;
};
