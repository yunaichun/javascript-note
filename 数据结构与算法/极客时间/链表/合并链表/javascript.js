/** https://leetcode.cn/problems/merge-two-sorted-lists/ */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let list = [];
  while (list1) {
    list.push(list1);
    list1 = list1.next;
  }
  while (list2) {
    list.push(list2);
    list2 = list2.next;
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
