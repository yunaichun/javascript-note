/** https://leetcode.cn/problems/reverse-linked-list-ii/ */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  /** 中间从 dynamicHead.next 开始 */
  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  for (let i = right - 1; i >= left - 1; i -= 1) {
    if (i === right - 1) dynamicHead.next = list[i];
    const node = list[i];
    prev.next = node;
    node.next = null;
    prev = node;
  }

  /** [list[0], list[left - 2]] [dynamicHead.next, prev] [list[right], list[len - 1]] */
  if (left >= 2) list[left - 2].next = dynamicHead.next;
  else list[0] = dynamicHead.next;
  if (list.length > right) prev.next = list[right];

  return list[0];
};
