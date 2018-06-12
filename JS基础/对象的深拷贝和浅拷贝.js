/* 浅拷贝 
代码的最后一行，你可以发现dad和kid的reads是一样的，
也就是他们使用的是同一个引用，这也就是浅拷贝带来的问题。
*/
function extend(parent, child) {
    child = child || {};
    // for in 遍历原型和实例所有可枚举属性，屏蔽原型中不可枚举属性
    for (var i in parent) {
    	// 获取实例对象上的属性
        if (parent.hasOwnProperty(i)) {
            child[i] = parent[i];
        }
    }
    return child;
}
// 非嵌套对象
var dad = { name: "Adam" };
var kid = extend(dad);
kid.add = 'add';
console.log(kid, dad); // { name: "Adam", add: 'add' }------{ name: "Adam" }
// 嵌套对象
var dad = {
    counts: [1, 2, 3],
    reads: { paper: true }
};
var kid = extend(dad);
kid.counts.push(4);
console.log(kid.counts, dad.counts); // [1, 2, 3, 4], [1, 2, 3, 4]
kid.reads.english = true;
console.log(dad.reads); // reads: { paper: true, english: true }------reads: { paper: true, english: true }



/* 深拷贝 
对象的深拷贝以后，两个值就不相等了，bingo！他们使用的不是一个引用！
*/
function extendDeep(parent, child) {
    child = child || {};
    for (var i in parent) {
        if (parent.hasOwnProperty(i)) {
        	// 判断出来的可能是Object也可能是Array
            if (typeof parent[i] === 'object') {
            	// 判断是对象还是数组
                if (Object.prototype.toString.call(parent[i]) === '[object Array]') {
                    child[i] = [];
                } else {
                    child[i] = {};
                }
                console.log(111, child, i, parent[i]);
                // 一、counts: [1, 2, 3]
                // 1.1、extendDeep([1, 2, 3], []); // 其中[] = child[counts] = { counts: [] }
                // 二、reads: { paper: true }
                // 2.1、extendDeep({ paper: true }, {}); // 其中{} = child[reads] = { reads: {} }
                extendDeep(parent[i], child[i]);
            } else {
            	console.log(222, child, i, parent[i]);
                child[i] = parent[i];
            }
        }
    }
    return child;
}
// 嵌套对象
var dad = {
    counts: [1, 2, 3],
    reads: { paper: true }
};
var kid = extendDeep(dad);
kid.counts.push(4);
console.log(kid.counts, dad.counts); // [1, 2, 3, 4]------[1, 2, 3]
kid.reads.english = true;
console.log(kid.reads, dad.reads); // reads: { paper: true, english: true }------reads: { paper: true }
