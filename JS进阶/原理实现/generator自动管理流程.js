/*一、参数的求值策略
	1、"传值调用"（call by value）：即在进入函数体之前就计算参数的值
	2、"传名调用"（call by name）： 即在进入函数体之后才计算参数的值
*/


/*二、Thunk 函数的含义
    编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。

	function f(m){
	  return m * 2;     
	}

	f(x + 5);

	// 等同于

	var thunk = function () {
	  return x + 5;
	};

	function f(thunk){
	  return thunk() * 2;
	}

	上面代码中，函数 f 的参数 x + 5 被一个函数替换了。凡是用到原参数的地方，对 Thunk 函数求值即可。
*/


/*三、JavaScript 语言的 Thunk 函数
    在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。
*/
// ES5版本：参数有回调函数
let ThunkES5 = function(fn) {
	return function() {
	    let args = Array.prototype.slice.call(arguments);
	    return function(callback) {
	        args.push(callback);
	        return fn.apply(this, args);
	    }
	};
};
// ES6版本：参数有回调函数
let ThunkES6 = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);//call传入多参数
    };
  };
};
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);
// 使用Thunk函数的readFile（多参数版本）
let readFileThunk = ThunkES5(fs.readFile);
readFileThunk(fileA)(callback);


/*四、Thunk 函数自动管理Generator流程*/
function run(fn) {
  let gen = fn();

  function next(err, data) {
    // gen.next()执行返回的是{ value: xxx, done: xxx }
    let result = gen.next(data);
    if (result.done) return;
    // 用递归来自动完成这个过程
    result.value(next);
  }

  // 初始执行一次，内部不断执行！！！！
  next();
}

let gen = function* (){
  let f1 = yield fs.readFile('fileA');
  let f2 = yield fs.readFile('fileB');
  // ...
  let fn = yield fs.readFile('fileN');
};

// 内部不断调用调用next函数
run(gen);