/** https://leetcode.cn/problems/reorder-list/ */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  const n = list.length;
  for (let i = 0; i < Math.floor(n / 2); i += 1) {
    const node1 = list[i];
    const node2 = list[n - 1 - i];

    if (i === 0) dynamicHead.next = node1;
    prev.next = node1;
    node1.next = node2;
    node2.next = null;

    prev = node2;
  }
  if ((n + 1) % 2 === 0) {
    prev.next = list[(n - 1) / 2];
    prev.next.next = null;
  }
  return dynamicHead.next;
};
