import ListNode from '../实现/链表'
// == leetcode: https://leetcode.com/problems/linked-list-cycle
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
