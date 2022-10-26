/** https://leetcode.cn/problems/add-two-numbers/ */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  /** 拿到节点值 */
  const list1 = [];
  while (l1) {
    list1.push(l1.val);
    l1 = l1.next;
  }
  const list2 = [];
  while (l2) {
    list2.push(l2.val);
    l2 = l2.next;
  }
  /** 数字相加 */
  const results = [];
  let i = 0;
  let j = 0;
  let addOne = 0;
  while (i < list1.length || j < list2.length || addOne !== 0) {
    const a = list1[i] || 0;
    const b = list2[j] || 0;
    results.push((a + b + addOne) % 10);
    if ((a + b + addOne) / 10 >= 1) addOne = 1;
    else addOne = 0;
    i += 1;
    j += 1;
  }
  /** 构建新链表 */
  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  for (let i = 0, len = results.length; i < len; i += 1) {
    const current = new ListNode(results[i]);
    if (i === 0) dynamicHead.next = current;
    prev.next = current;
    prev = current;
  }
  return dynamicHead.next;
};
