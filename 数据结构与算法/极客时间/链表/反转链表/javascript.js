// == leetcode: https://leetcode.com/problems/reverse-linked-list/
class Solution {
    constructor() {
    }
    reverseList(head) {
        let [prev, current] = [null, head]
        while(current) {
            // == current.next 没有改变 prev 和 current 节点
            // == prev 一直是第一个节点
            // == current 移动到下一个节点
            [current.next, prev, current] = [prev, current, current.next]
        }
        // ==  prev 始终为头节点
        return prev
    }
}
