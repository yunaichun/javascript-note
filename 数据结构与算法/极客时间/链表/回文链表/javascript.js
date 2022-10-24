/** https://leetcode.cn/problems/palindrome-linked-list/ */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }

  let len = list.length;
  for (let i = 0; i < Math.floor(len / 2); i += 1) {
    if (list[i].val !== list[len - i - 1].val) {
      return false;
    }
  }

  return true;
};
