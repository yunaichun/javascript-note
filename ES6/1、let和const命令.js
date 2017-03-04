/*一、let命令*/
/*1.1、let作用域只在申明的块级作用域有效*/
//var
var a = [];
for (var i = 0; i < 10; i++) {//var变量在for循环被覆盖
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

//let
var a = [];
for (let i = 0; i < 10; i++) {//let变量在for循环不会覆盖
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6

for (let i = 0; i < 3; i++) {//for循环语句部份是一个父作用域，而循环体内是一个单独的作用域
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc


/*1.2、不存在变量申明提升*/
// var
console.log(foo); // 输出undefined
var foo = 2;

// let
console.log(bar); // 报错ReferenceError
let bar = 2;


/*1.3、暂时性死区*/
//let绑定块级作用域，此区域let变量必须先申明
var tmp = 123;
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError

  typeof undeclared_variable // "undefined"
  typeof x; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}

function bar(x = y, y = 2) {//变量y未申明直接使用（修改为x=2,y=x）
  return [x, y];
}
bar(); // 报错

var x = x;// 不报错
let x = x;// 报错
// ReferenceError: x is not defined


/*1.4、不允许重复申明*/
// 报错
function () {
  let a = 10;
  var a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;//相同作用域内不能重复申明同一个参数
}

function func(arg) {
  let arg; // 函数内部不能重新申明参数。报错
}
function func(arg) {
  {
    let arg; // 不报错
  }
}



/*二、块级作用域*/
/*2.1、var、let块级作用域对比*/
//var
var tmp = new Date();
function f() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";//函数内部tmp变量提升
  }
}
f(); // undefined

var s = 'hello';
for (var i = 0; i < s.length; i++) {//var变量在for循环泄露为全局变量
  console.log(s[i]);
}
console.log(i); // 5

//let
function f1() {
  let n = 5;
  if (true) {
    let n = 10;//函数内部let变量不会提升
  }
  console.log(n); // 5
}
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World1'}
  console.log(insane); // 'Hello World'，允许任意嵌套作用域，作用域外无法读取作用域内变量
}}}};

// IIFE 写法
(function () {
  var tmp = "aaa";
  }());
// 等价于块级作用域写法
{
  let tmp = "aaa"
}


/*2.2 块级作用域与函数申明*/
//ES5：函数申明只能在顶层作用域和函数内部申明
// 情况一:ES5情况是报错的，浏览器中是没问题的。但是严格模式是报错的。
if (true) {
  function f() {}
}
// 情况二
try {
  function f() {}
} catch(e) {
// ...
}
//ES6：函数申明允许在块级作用域中申明
if (true) {
  function f() {} // 不报错
}

//ES5：函数体内的函数申明会被提升到函数头部
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
  // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();//inside
}());
//ES6：块级作用域申明的函数不会被提升到函数头部【类似let变量】
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
  // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();//outside
}());

//ES6：函数申明在浏览器中的规则--类似变量申明【上例在浏览器中是会报错的】
//- 允许在块级作用域内声明函数。
//- 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
//- 同时，函数声明还会提升到所在的块级作用域的头部。
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }
  f();
}());
// Uncaught TypeError: f is not a function


/*2.3 do表达式【块级作用域没有返回值，加上do解决】*/
let x = do {
  let t = f();
  t * t + 1;
};



/*三、const命令*/
/*3.1 基本语法*/
//const一旦声明，常量的值就不能改变。
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
//const一旦申明变量，就必须初始化
const foo;
// SyntaxError: Missing initializer in const declaration

//const作用域只在申明的块级作用域有效
if (true) {
  const MAX = 5;
}
MAX // Uncaught ReferenceError: MAX is not defined

//const申明的常量不能提升，存在暂时性死区
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}

//const不可重复申明统一常量
var message = "Hello!";
let age = 25;
// 以下两行都会报错
const message = "Goodbye!";
const age = 30;

//复合类型申明不能改变指向地址，本身可变（数组和对象）
const foo = {};
// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123
// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only

//冻结对象
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
const a = [];
a.push('Hello'); // 可执行
a.length = 0;  // 可执行
a = ['Dave'];  // 报错



/*四、顶层对象的属性*/
/*var定义的变量是顶层对象的属性，let定义的变量不是顶层对象的属性*/
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1
let b = 1;
window.b // undefined



/*五、globle对象*/
/* 
- 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
- 浏览器和 Web Worker 里面，self也指向顶层对象，但是Node没有self。
- Node 里面，顶层对象是global，但其他环境都不支持。
*/
/* 
- 全局环境中，this会返回顶层对象。但是，Node模块和ES6模块中，this返回的是当前模块。
- 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
- 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了CSP（Content Security Policy，内容安全政策），那么eval、new Function这些方法都可能无法使用。
*/
/*5.1渠道顶层对象的两种勉强方法*/
// 方法一
(typeof window !== 'undefined'
  ? window
  : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
    ? global
    : this
);
// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
//现在有一个提案，在语言标准的层面，引入global作为顶层对象。也就是说，在所有环境下，global都是存在的，都可以从它拿到顶层对象。


/*5.2垫片库system.gloable*/
// CommonJS的写法
var global = require('system.global')();
// ES6模块的写法
import getGlobal from 'system.global';
const global = getGlobal();
// 上面代码将顶层对象放入变量global。