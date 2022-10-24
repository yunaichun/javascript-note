/** https://leetcode.cn/problems/reverse-nodes-in-k-group/ */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }

  const n = Math.floor(list.length / k);
  if (n === 0) return head;

  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  for (let i = 0; i < n; i += 1) {
    if (i === 0) dynamicHead.next = list[0];
    prev.next = list[i];

    /** k 个翻转: [i * k, (i + 1) * k - 1] */
    for (let j = (i + 1) * k - 1; j >= i * k; j -= 1) {
      const node = list[j];
      prev.next = node;
      node.next = null;
      prev = node;
    }
  }

  if (list.length > n * k) prev.next = list[n * k];

  return dynamicHead.next;
};
