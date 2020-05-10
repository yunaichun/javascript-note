import ListNode from '../实现/链表'
/** leetcode: https://leetcode.com/problems/linked-list-cycle
    Input: 1->2->3->4
    Output: 2->1->4->3
 */
class Solution {
    constructor(props) {
        super(props)
    }
    swapPairs(head) {
        let slow = fast = head
        while (slow && fast && fast.next) {
            slow = slow.next
            fast = fast.next.next
            if (slow == fast) {
                return true
            }   
        }
        return false
    }
}