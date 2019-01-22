/*一、浅拷贝 - 1
  代码的最后一行，你可以发现dad和kid的reads是一样的，
  也就是他们使用的是同一个引用，这也就是浅拷贝带来的问题。
*/
function extend(parent, child) {
    child = child || {};
    // for in 遍历原型和实例所有可枚举属性，屏蔽原型中不可枚举属性
    for (let i in parent) {
    	// 获取实例对象上的属性
        if (parent.hasOwnProperty(i)) {
            child[i] = parent[i];
        }
    }
    return child;
}
// 非嵌套对象
let dad = { name: "Adam" };
let kid = extend(dad);
kid.add = 'add';
console.log(kid, dad); // { name: "Adam", add: 'add' }------{ name: "Adam" }
// 嵌套对象
let dad = {
    counts: [1, 2, 3],
    reads: { paper: true }
};
let kid = extend(dad);
kid.counts.push(4);
console.log(kid.counts, dad.counts); // [1, 2, 3, 4], [1, 2, 3, 4]
kid.reads.english = true;
console.log(dad.reads); // reads: { paper: true, english: true }------reads: { paper: true, english: true }


/*二、浅拷贝 - 2
  利用 ES6 的对象扩展运算符
*/
const obj = { a: 1, b: 2};
const obj2 = { ...obj }; // => { a: 1, b: 2 }
const obj3 = [1, 2, 3];
const obj4 = [...obj3]; // => [1, 2, 3]


/*三、深拷贝 - 1 
  对象的深拷贝以后，两个值就不相等了，他们使用的不是一个引用！
*/
/**
 * [extendDeep 深度拷贝（含初始值混入）]
 * @param  {[type]} parent [父对象]
 * @param  {[type]} child  [初始值]
 * @return {[type]}        [description]
 */
function extendDeep(parent, child) {
    // 初始化 child : 类型与 parent 一致
    if (!child) {
        if (Object.prototype.toString.call(parent) === '[object Array]') child = [];
        else child = {};
    }
    for (let key in parent) {
        if (parent.hasOwnProperty(key)) {
            if (typeof parent[key] === 'object') {
                child[key] = extendDeep(parent[key]);
            } else {
                child[key] = parent[key];
            }
        }
    }
    return child;
}
// 嵌套对象
let dad = {
    counts: [1, 2, 3],
    reads: { paper: true }
};
let kid = extendDeep(dad, { counts: [], c: 1 });
kid.counts.push(4);
console.log(kid.counts, dad.counts); // [1, 2, 3, 4]------[1, 2, 3]
kid.reads.english = true;
console.log(kid.reads, dad.reads); // reads: { paper: true, english: true }------reads: { paper: true }


/*四、深拷贝 - 2 
  利用JSON.stringify + JSON.parse
*/
let test1 = {
  counts: [1, 2, 3],
  reads: { paper: true }
};
test2 = JSON.parse(JSON.stringify(test1));


/**
 * [myDeepCopy 深度拷贝（不含初始值）]
 * @param  {[type]} parent [父对象]
 * @return {[type]}        [description]
 */
function myDeepCopy(parent) {
  let obj = Array.isArray(parent) ? [] : {};
  for (let key in parent) {
     if (parent.hasOwnProperty(key)) {
          if (typeof parent[key] === 'object') {
            obj[key] = deepCopy(parent[key]);
          } else {
            obj[key] = parent[key];
          }
     }
  }
  return obj;
}
