// import MinHeap from '../最小堆/MinHeap'

// == leetcode: https://leetcode.com/problems/kth-largest-element-in-a-stream/
class KthLargest {
    constructor(k, nums) {
        this.k = k;
        let prev = nums.slice(0, k);
        let next = nums.slice(k);
        this.heap = new MinHeap(prev);
        next.forEach(val => this.add(val));
    }

    add(val) {
        if (val > this.heap.data[0]) {
            this.heap.deleteMax();
            this.heap.add(val);
        }
        return this.heap.data[0];
    }
    
}

// == 数组中第 k 大数据：
// == 可以取数组的前 K 位构建一个最小堆，这么堆顶就是前 K 位最小的值
// == 然后从 K + 1 遍历数组，如果小于堆顶，不添加，如果大于堆顶则添加（并重新构建堆）
// == 这么遍历结束后，堆就是最大的 K 位，堆顶是前 K 位的最小值

// == 数组中前 k 大数据：
// == 可以取数组的前 K 位构建一个最小。。≥≥≥≥≥≥≥。。。。。。。。。。。。。。。。。。。。。。。。。。。。。≥≥≥≥≥≥≥。。。。。。。。≥。。。。。。。≥≥≥≥≥。。。。。。。。。。。。。。。。。。。堆，这么堆顶就是前 K 位最小的值
// == 然后从 K + 1 遍历数组，如果小于堆顶，不添加，如果大于堆顶则添加（并重新构建堆）
// == 这么遍历结束后，堆就是最大的 K 位，堆顶是前 K 位的最小值


// == 快排求数组最大前k个数
function qSort(list, k) {
    if (list.length <= 1) return list;
    let p = list[0];
    let lesser = [];
    let greater = [];
    for (let i = 1, len = list.length; i < len; i++) {
        if (list[i] < p) {
            lesser.push(list[i]);
        } else {
            greater.push(list[i]);
        }
    }
    if (greater.length === k) {
        return greater;
    } else if (greater.length > k) {
        return qSort(greater, k);
    } else {
        return qSort(greater, k).concat(p, qSort(lesser, k));
    }
}
console.log(qSort([1,2,3,4,5,6,7], ))
