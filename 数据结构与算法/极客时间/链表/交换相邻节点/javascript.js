// == leetcode: https://leetcode.com/problems/swap-nodes-in-pairs/
class Solution {
    constructor() {
    }
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    // == Given 1->2->3->4, you should return the list as 2->1->4->3.
    swapPairs(head) {
        // == prev 是记录位置使用，是每一组 2 个当中的最后一个节点
        // == 实际交换的是 prev.next 和 prev.next.next
        let prev = self;
        prev.next = head;
        while (prev.next && prev.next.next) {
            let a = prev.next;
            let b = prev.next.next;
            // == 交换从起始位置开始
            prev.next = b;
            a.next = b.next;
            b.next = a;
            // ==  重置起点
            prev = a;
        }
        return prev.next;
    }
}
