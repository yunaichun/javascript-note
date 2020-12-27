// == leetcode: https://leetcode.com/problems/lru-cache/
class LRUCache {
    // == 存储最大长度
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }
    // == 获取 key 的 value
    get(key) {
        if(!this.cache.has(key)) return -1;
        // == find key and put first
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    // == 设置 key 和 value
    put(key, value) {
        if (this.cache.get(key)) this.cache.delete(key);
        this.cache.set(key, value);
        if(this.cache.size > this.capacity) {
            const keys = this.cache.keys();
            const firstKey = keys.next().value;
            this.cache.delete(firstKey);
        }
    }
}
/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key, value)
 */
