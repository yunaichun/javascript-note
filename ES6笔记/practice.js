/**
 * 参考地址：https;//mp.weixin.qq.com/s/HJ68lqZl9hN95kMGrJO5XA
 */
// 1、z = { a: 2, b: 4 }
let { x, y, ...z } = { x: 1, y: 2, a: 2, b: 4};
let a = { b: 1, c: 1 };
let d = { e: 1, f: 1 };
let g = { a, d };
console.log(g);// { a: { b: 1, c: 1 }, d: { e: 1, f: 1 } }
let h = { a, ...d };
console.log(h);// { a: { b: 1, c: 1 }, e: 1, f: 1 }
let i = { ...a, d };
console.log(i);// { b: 1, c: 1, d: { e: 1, f: 1 } }
let j = { ...a, ...d };
console.log(j);// { b: 1, c: 1, d: { e: 1, f: 1 } }

// 2、obj => {}
let { ...obj } = Object.create({ x: 1 });

// 3、功能相同
function fn1(obj) {
	let { x, y, ...z } = obj;
	console.log(x, y, z);
	return { x, y, z};
}
fn1({ x: 1, y: 2, z: 3, a: 4 }); // z = { z: 3, a: 4 }
function fn2(obj) {
	let { x, ...n } = obj;
	let { y, ...z } = n;
	console.log(x, y, z);
	return { x, y, z};
}  
fn2({ x: 1, y: 2, z: 3, a: 4 }); // z = { z: 3, a: 4 }

// 4、Uncaught TypeError: Cannot destructure property `x1` of 'undefined' or 'null'
let { x1, y1, ...z1 } = null; // 只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对>它们进行解构赋值，都会报错
console.log(z1);

// 5、解构赋值 Rest参数 必须是最后一个元素
let obj = { x: 1, y: 2, a: 3, b: 4 };
let { ...x, y, z } = obj;
console.log(x); // Uncaught SyntaxError: Rest element must be last element

// 6、objWithXGetter = { y: 2, a: 3, b: 4 }
let obj = { x: 1, y: 2, a: 3, b: 4 };
let objWithXGetter = {
	...obj,
	get x() { throw new Error() }
};

// 7、Uncaught SyntaxError: Unexpected identifier
let obj = { x: 1, y: 2, a: 3, b: 4 };
let objWithXGetter = {
	...obj,
	...get x() { throw new Error() }
};

// 8、数组解构赋值
let emptyObject = { ...null, ...undefined };
console.log(emptyObject); // {}
let emptyArray = [...null, ...undefined];
console.log(emptyArray); // Uncaught TypeError: null is not iterable，undefined is not iterable

// 9、Uncaught TypeError: x is not iterable
let x = { a: 1, b: 2 };
let y = [ ...x ];

// 10、Uncaught TypeError: x is not iterable
let x = { a: 1, b: 2, length: 2 };
let y = [ ...x ];

// 11、数组解构赋值
let x = [ 1, 2 ]; // 先将数组转换为对象 { 0: 1, 1: 2 }
let { ...y } = x;
console.log(y); // { 0: 1, 1: 2 }

// 12.
let x = { a: 1 };
let o = {
	__proto__: null,
	b: 2,
	...x 
};
console.log(o);// { a: 1, b: 2 }

// 13、x.length === 1
let x = `\u{55}`;
x.length;

// 14、Uncaught SyntaxError: Invalid Unicode escape sequence
let x = `\unicode`;
x.length;

// 15、x.length === 6
let x = String.raw`\u{55}`;
x.length;

// 16、x.length === 8
let x = String.raw`\unicode`;
x.length;

// 17、Uncaught SyntaxError: Invalid Unicode escape sequence
function tag(str) {
	return str[0].toUpperCase();
}
tag(`\unicode`);

// 18、undefined
function tag(str) {
	return str[0];
}
tag`\unicode`; // undefined

// 19、true
let regex = /^.$/;
regex.test('道');

// 20、. 是匹配除换行符之外的所有字符
let regex = /./;
regex.test('\n'); // false【换行】
regex.test('\r'); // false【回车】
regex.test('\v'); // true【垂直制表】
regex.test('\f'); // true【换页】
regex.test('\t'); // true【tab键】
regex.test('\b'); // true【退格键】
regex.test('\u{2028}'); // false
regex.test('\u{2029}'); // false
regex.test('\u{0085}'); // true