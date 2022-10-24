/** https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/ */

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
var deleteDuplicates = function (head) {
  let list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }

  list = list.filter((i) => {
    const iCount = list.filter((j) => j.val === i.val);
    if (iCount.length > 1) return false;
    return true;
  });

  const dynamicHead = new ListNode(0);
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
