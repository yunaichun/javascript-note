// == Java     实现：https://segmentfault.com/a/1190000021649411
// == JS       实现：https://blog.csdn.net/Juanmfc/article/details/77070916
// == leetcode 实现：https://leetcode.com/problems/kth-largest-element-in-a-stream/discuss/504552/JavaScript-Min-Heap-solution
export default class MinHeap {
    constructor(data = []) {
        this.data = data;
        this.shiftUp();
    }

    // == 向堆中插入一个元素：插入到最后一个位置, 对插入的元素向上进行堆重构
    add(val) {
        this.data.push(val);
        this.shiftUp();
    }

    // == o(log2 n ) 新元素跟父元素比较，新元素大则交换，一直到新元素比父元素小为止
    shiftUp() {
        let data = this.data;
        let i = data.length - 1;
        while(i > 0) {
            let j = Math.floor(i / 2);
            if(data[i] < data[j]) {
                let temp = data[i];
                data[i] = data[j];
                data[j] = temp;
                i = j;
            } else {
                break;
            }
        }
    }

    // == 删除堆中的最大元素：将最后一个元素放到第一个的位置，向下进行堆重构
    deleteMax(){
        if(this.data.length > 1) {
            let last = this.data.pop();
            this.data[0] = last;
            this.shiftDown();
        }
    }

    // == 向下堆重构：从堆顶开始，比较当前元素和两个子元素，
    // == 若当前元素小于子元素中的一个，则将当前元素与较大的子元素交换，直到当前元素大于其子元素
    shiftDown() {
        let data = this.data;
        let i = 0;
        // == 循环条件： 有左孩子且左孩子和右孩子中至少有一个大于当前元素
        while(2 * i  < data.length) {
            if (data[i] > data[2 * i + 1] || data[i] > data[2 * i + 2]) {
                let temp;
                if(data[2 * i + 1] < data[2 * i + 2]) {
                    // == 有右孩子且右孩子大于左孩子
                    temp = data[i];
                    data[i] = data[2 * i + 2];
                    data[2 * i + 2] = temp;
                    i = 2 * i + 2;
                } else {
                    // == 没有右孩子、右孩子比左孩子小
                    temp = data[i];
                    data[i] = data[2 * i + 1];
                    data[2 * i + 1] = temp;
                    i = 2 * i + 1;
                }
            } else {
                break;
            }
        }
    }
}

let heap = new MinHeap();
heap.add(1);
heap.add(5);
heap.add(4);
heap.deleteMax();
console.log(heap)
