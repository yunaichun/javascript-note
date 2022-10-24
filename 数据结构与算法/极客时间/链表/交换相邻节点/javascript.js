/** https://leetcode.cn/problems/swap-nodes-in-pairs */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  const dynamicHead = new ListNode(0);
  dynamicHead.next = head;

  let headPre = dynamicHead;
  while (head) {
    let tail = headPre;
    /** 1、判断是否包含 2 个元素 */
    for (let i = 0; i < 2; i += 1) {
      tail = tail.next;
      if (!tail) return dynamicHead.next;
    }

    /** 2、交换 2 个节点 */
    const temp = tail.next;
    [head, tail] = reverse(head, tail);

    /** 3、拼接 */
    headPre.next = head;
    tail.next = temp;

    /** 下一个循环 */
    headPre = tail;
    head = temp;
  }

  return dynamicHead.next;
};

var reverse = function (head, tail) {
  let prev = null;
  let cur = head;
  while (cur && prev !== tail) {
    const temp = cur.next;

    cur.next = prev;
    prev = cur;

    cur = temp;
  }
  return [tail, head];
};
