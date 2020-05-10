/**
    Input: 1->2->3->4->5->NULL
    Output: 5->4->3->2->1->NULL

    一、1(prev)->2(current)->3->4->5->NULL
    二、2(prev)->1->3(current)->4->5->NULL
 */
class Solution {
    constructor(props) {
        super(props)
    }
    reverseList(head) {
        let [prev, current] = [null, head]
        while(current) {
            // == current.next 没有改变 prev 和 current 节点
            // == prev 一直是第一个节点
            // == current 移动到下一个节点
            [current.next, prev, current] = [prev, current, current.next]
        }
        return prev
    }
}
