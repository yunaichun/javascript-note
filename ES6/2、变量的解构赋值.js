/*一、数组解构赋值*/
/*1.1、从数组和对象中提取值 */
let [foo, [[bar], baz]] = [1, [[2], 3]];
// foo // 1
// bar // 2
// baz // 3
let [ , , third] = ["foo", "bar", "baz"];
// third // "baz"
let [x, , y] = [1, 2, 3];
// x // 1
// y // 3
let [head, ...tail] = [1, 2, 3, 4];
// head // 1
// tail // [2, 3, 4]
let [x, y, ...z] = ['a'];
// x // "a"
// y // undefined
// z // []

/*1.2、解构不成功为undefined*/
let [foo] = [];
let [bar, foo] = [1];

/*1.3、不完全解构*/
let [x, y] = [1, 2, 3];
// x // 1
// y // 2
let [a, [b], d] = [1, [2, 3], 4];
// a // 1
// b // 2
// d // 4

/*1.4、报错情况*/
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

/*1.5、Set解构解构*/
let [x, y, z] = new Set(['a', 'b', 'c']);
/*x // "a"*/

/*1.6、解构具有Iterator接口*/
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

/*1.7、解构默认值*/
//默认值生效的条件是右边严格等于undefined
let [x = 1] = [undefined];
x // 1
let [x = 1] = [null];
x // null
//默认值可以引用其他变量
let [x = 1, y = x] = [];    // x=1; y=1
let [x = 1, y = x] = [2];  // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];    // ReferenceError



/*二、对象的解构赋值*/
/*2.1、变量名位置可以不对应*/
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

/*2.2、匹配模式*/
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
//注意：let和const不能重复申明
let foo;
let {foo} = {foo: 1};
// SyntaxError: Duplicate declaration "foo"
let baz;
let {bar: baz} = {bar: 1};
// SyntaxError: Duplicate declaration "baz"
//注意：var申明是可以的，但是必须以()括起来为代码块
let foo;
({foo} = {foo: 1}); // 成功
let baz;
({bar: baz} = {bar: 1}); // 成功

/*2.3、嵌套对象*/
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]};
let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // {prop:123}
arr // [true]

/*2.4、默认值*/
//默认值生效的条件是右边严格等于undefined
var {x = 3} = {x: undefined};
x // 3
var {x = 3} = {x: null};
x // null
//默认值可以引用其他变量
var {x = 3} = {};
x // 3
var {x, y = 5} = {x: 1};
x // 1
y // 5
var {x:y = 3} = {};
y // 3
var {x:y = 3} = {x: 5};
y // 5
var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"

/*2.5、解构不成功为undefined*/
let {foo} = {bar: 'baz'};
foo // undefined

/*2.6、报错情况*/
// 子对象所在的父属性不存在
let {foo: {bar}} = {baz: 'baz'};
// 左右不对等
let _tmp = {baz: 'baz'};
_tmp.foo.bar
// 变量提前申明，需要用括号
let x;
{x} = {x: 1};
// SyntaxError: syntax error

/*2.7、结构数组对象*/
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3



/*三、字符串的解构赋值*/
// 3.1、字符串-->数组
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

// 3.2、length属性
let {length : len} = 'hello';
len // 5



/*四、数值和布尔值的解构赋值*/
/*4.1、数值和布尔值-->数组*/
let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true
/*4.2、undefined和null无法转换为对象*/
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError



/*五、函数参数的解构赋值*/
/*5.1、实例*/
//形参是变量，实参是值
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3
[[1, 2], [3, 4]].map(([a, b]) => a + b);// [ 3, 7 ]

/*5.2、参数默认值*/
//函数参数是一个对象，对其解构{x=0,y=0}【有默认值的情况】
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
//为参数指定默认值，而不是变量的情况{x:0,y:0}【没有默认值的情况】
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
} 
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

/*5.3、值为undefined触发默认值*/
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]



/*六、圆括号*/
/*6.1、 变量声明语句中，不能带有圆括号*/
// 全部报错
let [(a)] = [1];//无let申明是可以的
let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};
let { o: ({ p: p }) } = { o: { p: 2 } };

/*6.2、 函数参数中，模式不能带有圆括号*/
// 报错
function f([(z)]) { return z; }

/*6.3、 赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。*/
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
// 报错
[({ p: a }), { x: c }] = [{}, {}];

/*6.4、可以使用圆括号*/
//可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。【赋值语句，不是申明语句】
[(b)] = [3]; // 正确【模式是取数组第一个成员】
({ p: (d) } = {}); // 正确【模式是p，而不是d】
[(parseInt.prop)] = [3]; // 正确【模式是取数组第一个成员】

//变量提前申明，需要用括号
let foo;
({foo} = {foo: 1}); // 成功
let baz;
({bar: baz} = {bar: 1}); // 成功





/*七、用途*/
/*7.1、交换变量值*/
let x = 1;
let y = 2;
[x, y] = [y, x];

/*2、从函数返回多个值*/
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();

/*7.3、函数参数的定义*/
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});

/*7.4、提取JSON数据*/
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// 42, "OK", [867, 5309]

/*7.5、函数参数的默认值*/
//避免了在函数体内部再写var foo = config.foo || 'default foo';
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
// ... more config
}) {
// ... do stuff
};

/*7.6、遍历Map结构*/
//获取键名和键值
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
// 获取键名
for (let [key] of map) {
// ...
}
// 获取键值
for (let [,value] of map) {
// ...
}

/*7.7、输入模块的指定方法*/
const { SourceMapConsumer, SourceNode } = require("source-map");