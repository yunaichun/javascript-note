import MinHeap from '../最小堆/MinHeap'

// == leetcode: https://leetcode.com/problems/kth-largest-element-in-a-stream/
class KthLargest {
    constructor(k, nums) {
        this.k = k;
        this.heap = new MinHeap();
        nums.forEach(n => this.add(n));
    }
    add(val) {
        this.heap.add(val);
        return this.heap.peek(this.k);
    }
}
