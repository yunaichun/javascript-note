/*一、参数的求值策略
	1、"传值调用"（call by value）：即在进入函数体之前就计算参数的值
	2、"传名调用"（call by name）： 即在进入函数体之后才计算参数的值
*/




/*二、Thunk 函数
    1、编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
    2、在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数！！！！！
*/
// ES5版本（Thunk 函数只接受回调函数作为参数）
let ThunkES5 = function(fn) {
	return function() {
	    let args = Array.prototype.slice.call(arguments);
	    return function(callback) {
	        args.push(callback);
	        return fn.apply(this, args);
	    }
	};
};
// ES6版本（Thunk 函数只接受回调函数作为参数）
let ThunkES6 = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    };
  };
};
// 正常调用 fs.readFile
fs.readFile(fileName, callback);
// 使用 Thunk 函数的 readFile
let readFileThunk = ThunkES5(fs.readFile);
readFileThunk(fileA)(callback);




/*三、Thunkify 模块
    Thunkify主要多了一个检查机制，变量 called 确保回调函数只运行一次。
*/
function thunkify(fn){
    return function(){
	    let ctx = this;
	    let args = new Array(arguments.length);
	    for(let i = 0; i < args.length; ++i) {
	      args[i] = arguments[i];
	    }
	    return function(done) {
	      let called;
	      args.push(function() {
	        if (called) return;
	        called = true;
	        done.apply(null, arguments); // arguments 是形参，sum 是实参
	      });
	      try {
	        fn.apply(ctx, args);
	      } catch (err) {
	        done(err);
	      }
	    }
    }
};
function f(a, b, callback) {
    let sum = a + b;
    callback(sum);
    callback(sum);
}
let ft = thunkify(f);
ft(1, 2)(console.log); // 3
// 以上调用等价于：但是会调用两次
f(1, 2, function(res) {
	console.log.call(null, res);
});




/*四、Generator注意点（https://blog.csdn.net/qq_30100043/article/details/53484350）

  1、执行g.next(): 得到的是 yield 后面的值
  2、执行g.next(value): 会将上一步 yield 后面的值 设置为 value
  3、执行g.return(value): 得到结果为 { value, done:true } // 没有finally的情况

  4、Generator 函数是遍历器生成函数，执行 Generator 函数会生成遍历器对象；
     将 Generator 函数赋值给某对象的 Symbol.iterator 属性，则 该对象 具有 遍历器 接口；
     可以被 for..of（可以自动遍历遍历器对象，且此时不再需要调用next方法）、Array.from、结构赋值、... 运算符遍历。
     function* numbers() { yield 1; yield 2; return 3; yield 4; }
     [...numbers()] // [1, 2]                       ->   遍历器接口：扩展运算符
     Array.from(numbers()) // [1, 2]                ->   遍历器接口：Array.form 方法
     let [x, y] = numbers(); // 1 2                 ->   遍历器接口：解构赋值
     for (let n of numbers()) { console.log(n); }   ->   遍历器接口：for...of

  5、function* gen() {}      let g = gen();
     // g 遍历器对象 可以被 for...of 遍历，则可知 g 的 Symbol.iterator 的属性值等于 gen 遍历器生成函数
     g[Symbol.iterator] === gen
     g[Symbol.iterator]() === g

  6、let jane = { first: 'Jane', last: 'Doe' }; // jane 对象此时不能被 for..of 遍历，因为 Symbol.iterator 的属性值不为 遍历器生成函数
     jane[Symbol.iterator] = function* () {};   // jane 对象此时可以被 for..of 遍历，因为 Symbol.iterator 的属性值不为 遍历器生成函数
*/




/*五、Thunk 函数自动管理 Generator 流程
      原理：回调函数，将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
*/
let fs = require('fs');
let thunkify = require('thunkify');
let readFile = thunkify(fs.readFile);
let gen = function* (){
    let f1 = yield readFile('fileA');
    let f2 = yield readFile('fileB');
    // ...
    let fn = yield readFile('fileN');
};
/*法一：手动执行（通过 g.next() 的 value 属性获取到内部 thunk 函数）
	上面代码中，yield 命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给 Generator 函数。
	这种方法就是 Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数！！！！！！！！！！！！！！！！！！
*/
let g = gen();
let r1 = g.next();
// 可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入 next 方法的 value 属性
r1.value(function(err, data){ // 此处 value 是一个 thunk 函数！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    if (err) throw err;
    let r2 = g.next(data);
    r2.value(function(err, data){
        if (err) throw err;
        g.next(data);
    });
});
/*法二：自动执行（递归方法）
	上面代码中，yield 命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给 Generator 函数。
	这种方法就是 Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数。
*/
function run(genCreator) {
	let gen = genCreator();
	// let r1 = gen.next();
	// if (r1.done) { return; }
	// r1.value(function(err, data) {
	// 	  let r2 = g.next(data);
	// 	  if (r2.done) { return; }
	// 	  r2.value(function() {
	// 		  ...
	// 	  });
	// });
	function next(err, data) {
		let result = gen.next(data); // data 是设置 Generator 内部 yield 的值
		if (result.done) { return; }
		result.value(next);
	}
	next();
}
run(gen);
