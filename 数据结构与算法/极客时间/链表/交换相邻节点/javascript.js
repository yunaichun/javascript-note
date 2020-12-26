// == leetcode: https://leetcode.com/problems/swap-nodes-in-pairs/
class Solution {
    constructor() {
    }
    // == Given 1->2->3->4, you should return the list as 2->1->4->3.
    swapPairs(head) {
        let node = new ListNode();
        node.next = head;
        let prev = node;
        while(prev.next && prev.next.next) {
            // == 初始: prev -> a -> b
            const a = prev.next;
            const b = a.next;
            
            // == 转换: b -> a(prev)
            prev.next = b;
            a.next = b.next;
            b.next = a;
            
            prev = a;
        }
        return node.next;
    }
}