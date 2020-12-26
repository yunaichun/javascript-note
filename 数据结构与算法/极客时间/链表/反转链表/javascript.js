// == leetcode: https://leetcode.com/problems/reverse-linked-list/
class Solution {
    constructor() {
    }
    reverseList(head) {
        // == prev 是记录位置使用，是新 List 第一个节点
        let [prev, current] = [null, head]
        while(current) {
            const temp = current.next;

            // == 从后往前调整指向
            current.next = prev;
            prev = current;
            current = temp;

            // == 等价于: [current.next, prev, current] = [prev, current, current.next]
        }
        // ==  prev 始终为头节点
        return prev;
    }
}
