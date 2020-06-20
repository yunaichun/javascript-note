class UnionAndFind {
    constructor(n) {
        this.roots = [];
        for (let i = 0; i < n; i++) {
            // == n 个数据的父节点均是自己
            this.roots[i] = i;
        }
    }
    // == 查找 i 的根节点
    find(i) {
        let root = i;
        while (root !== this.roots[root]) {
            root = this.roots[root];
        }
        // == 优化二：路径压缩-直接指向父节点
        while (i !== this.roots[i]) {
            let temp = this.roots[i];
            this.roots[i] = root;
            i = temp;
        }
        return root;
    }
    // == 合并 2 个集合
    union(x, y) {
        // == 优化一：通过层级将并查集更扁平
        let rootX = this.find(x);
        let rootY = this.find(y);
        this.roots[rootX] = rootY;
    }
}

let a = new UnionAndFind(5); // [0, 1, 2, 3, 4]
console.log(a.find(4)) // 4
a.union(2, 3) // [0, 1, 3, 3, 4]
console.log(a.find(2)) // 3
