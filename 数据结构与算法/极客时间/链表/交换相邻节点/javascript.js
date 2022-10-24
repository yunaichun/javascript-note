/** https://leetcode.cn/problems/swap-nodes-in-pairs */

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
var swapPairs = function (head) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  const n = list.length;
  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  for (let i = 0; i < n && i + 1 < n; i += 2) {
    const node1 = list[i];
    const node2 = list[i + 1];
    if (i === 0) dynamicHead.next = node2;

    prev.next = node2;
    node2.next = node1;
    node1.next = null;

    prev = node1;
  }
  if (n % 2 === 1) prev.next = list[n - 1];

  return dynamicHead.next;
};
