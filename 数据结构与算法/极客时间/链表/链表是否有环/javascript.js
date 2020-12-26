// == leetcode: https://leetcode.com/problems/linked-list-cycle
class Solution {
    constructor() {
    }
    swapPairs(head) {
        let slow = fast = head;
        while (slow && fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }   
        }
        return false;
    }
}
