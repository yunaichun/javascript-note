/** https://leetcode.cn/problems/remove-nth-node-from-end-of-list/ */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  /** 删除链表的节点 index 为 len - n */
  const len = list.length;
  if (len - n >= 1) list[len - n - 1].next = list[len - n].next;
  else return list[0].next;
  return list[0];
};
