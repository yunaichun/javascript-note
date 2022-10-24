/** https://leetcode.cn/problems/reverse-linked-list/ */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  const dynamicHead = new ListNode();
  const n = list.length;
  let prev = dynamicHead;
  for (let i = n - 1; i >= 0; i -= 1) {
    const node = list[i];
    if (i === n - 1) dynamicHead.next = node;
    prev.next = node;
    node.next = null;
    prev = node;
  }
  return dynamicHead.next;
};
