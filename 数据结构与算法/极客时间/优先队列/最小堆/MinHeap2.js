// == https://juejin.im/post/5d53d4cd6fb9a06aec26367b
class MinHeap {
    constructor() {
        this.heap = []
        this.len = 0
    }
    size() {
        return this.len
    }
    push(val) {
        this.heap[++this.len] = val
        this.swin(this.len)
    }
    pop() {
        const ret = this.heap[1]
        this.swap(1, this.len--)
        this.heap[this.len + 1] = null
        this.sink(1)
        return ret
    }
    swin(ind) {
        while (ind > 1 && this.less(ind, parseInt(ind / 2))) {
            this.swap(ind, parseInt(ind / 2))
            ind = parseInt(ind / 2)
        }
    }
    sink(ind) {
        while (ind * 2 <= this.len) {
            let j = ind * 2
            if (j < this.len && this.less(j + 1, j)) {
                j++
                if (this.less(ind, j)) break
                this.swap(ind, j)
                ind = j
            }
        }
    }
    top() {
        return this.heap[1]
    }
    isEmpty() {
        return this.len === 0
    }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }
    less(i, j) {
        return this.heap[i] < this.heap[j]
    }
}
