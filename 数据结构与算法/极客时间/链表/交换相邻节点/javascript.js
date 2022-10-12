/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/** https://leetcode.cn/problems/swap-nodes-in-pairs/
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  // 1 -> 2 -> 3 -> 4
  // 1、0(cur) -> 2 -> 1
  // 2、0 -> 2 -> 1(cur) -> 4 -> 3
  const dummyHead = new ListNode(0);
  dummyHead.next = head;
  let cur = dummyHead;
  while (cur.next && cur.next.next) {
    /** 控制循环: 下一个节点 */
    const node1 = cur.next; // 1
    const node2 = cur.next.next; // 2

    cur.next = node2; // 0.next = 2
    node1.next = node2.next; // 1.next = 2.next
    node2.next = node1;

    /** 控制循环: 下一个节点 */
    cur = node1;
  }
  return dummyHead.next;
};
