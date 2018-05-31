/*
迭代器模式(Iterator)：提供一种方法顺序一个聚合对象中各个元素，而又不暴露该对象内部表示。

迭代器的几个特点是：
1、访问一个聚合对象的内容而无需暴露它的内部表示。
2、为遍历不同的集合结构提供一个统一的接口，从而支持同样的算法在不同的集合结构上进行操作。
3、遍历的同时更改迭代器所在的集合结构可能会导致问题（比如C#的foreach里不允许修改item）。
*/
var agg = (function () {
    var index = 0,
    data = [1, 2, 3, 4, 5],
    length = data.length;

    return {
        next: function () {
            var element;
            if (!this.hasNext()) {
                return null;
            }
            element = data[index];
            index = index + 2;
            return element;
        },
        hasNext: function () {
            return index < length;
        },
        rewind: function () {
            index = 0;
        },
        current: function () {
            return data[index];
        }
    };
} ());

// 迭代的结果是：1,3,5
while (agg.hasNext()) {
    console.log(agg.next());
}

// 重置
agg.rewind();
console.log(agg.current()); // 1