// == leetcode: https://leetcode.com/problems/kth-largest-element-in-a-stream/

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
console.log(qSort([1,2,3,4,5,6,7], 3))
