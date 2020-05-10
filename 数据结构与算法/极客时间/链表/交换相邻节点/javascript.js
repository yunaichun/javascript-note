import ListNode from '../实现/链表'
/** leetcode: https://leetcode.com/problems/swap-nodes-in-pairs/
    Input: 1->2->3->4
    Output: 2->1->4->3
 */
class Solution {
    constructor(props) {
        super(props)
    }
    swapPairs(head) {
        // == 从头节点开始，同时保存头节点
        let result = prev = new ListNode(0)
        prev.next = head
        while (prev.next && prev.next.next) {
            let a = prev.next
            let b = prev.next.next
            prev.next = b
            a.next = b.next
            b.next = a
            // ==  重置起点
            prev = a
        }
        
        return result.next;
    }
}
