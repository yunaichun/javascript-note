/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/** https://leetcode.cn/problems/reverse-linked-list/
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // 1 -> 2 -> 3 -> 4
  // 1、1(prev) -> null
  // 2、2(prev) -> 1
  // 3、3(prev) -> 2 -> 1
  // 4、4(prev) -> 3 -> 2 -> 1
  /** 存储的是循环中上一个节点*/
  let prev = null;
  let cur = head;
  while (cur) {
    /** 控制循环: 下一个节点 */
    const temp = cur.next;
    cur.next = prev;
    prev = cur;
    /** 控制循环: 下一个节点 */
    cur = temp;
  }
  return prev;
};
