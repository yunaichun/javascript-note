import MinHeap from '../最小堆/MinHeap'
// == leetcode: https://leetcode.com/problems/kth-largest-element-in-a-stream/
// == 小顶堆、size = K
class KthLargest {
    constructor(k, nums) {
        this.k = k;
        this.heap = new MinHeap();
        nums.forEach(n => this.add(n));
    }
    add(val) {
        if (this.heap.size() < this.k) {
            this.heap.offer(val);
        } else if (this.heap.peek() < val) {
            this.heap.offer(val);
            this.heap.poll();
        }
        return this.heap.peek();
    }
}
