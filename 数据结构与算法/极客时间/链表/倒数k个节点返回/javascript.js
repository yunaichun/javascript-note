/** https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/ */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  /** 返回链表的节点 index 为 len - n */
  const len = list.length;
  return list[len - k];
};
