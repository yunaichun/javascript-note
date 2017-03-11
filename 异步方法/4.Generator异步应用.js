/**
 * 一 、传统异步
 */
/* 
异步
所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，
先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。
比如，有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件。
然后，程序执行其他任务，等到操作系统返回文件，再接着执行任务的第二段（处理文件）。
这种不连续的执行，就叫做异步。
相应地，连续的执行就叫做同步。由于是连续执行，不能插入其他任务，
所以操作系统从硬盘读取文件的这段时间，程序只能干等着。
*/
/*1.1、回调函数*/
/* 
回调函数
JavaScript 语言对异步编程的实现，就是回调函数。
所谓回调函数，就是把任务的第二段单独写在一个函数里面，
等到重新执行这个任务的时候，就直接调用这个函数。
回调函数的英语名字callback，直译过来就是"重新调用"。
*/
//读取文件进行处理，是这样写的。
fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
  if (err) throw err;
  console.log(data);
});
/* 
上面代码中，readFile函数的第三个参数，就是回调函数，也就是任务的第二段。
等到操作系统返回了/etc/passwd这个文件以后，回调函数才会执行。

一个有趣的问题是，为什么 Node 约定，回调函数的第一个参数，
必须是错误对象err（如果没有错误，该参数就是null）？
原因是执行分成两段，第一段执行完以后，任务所在的上下文环境就已经结束了。
在这以后抛出的错误，原来的上下文环境已经无法捕捉，只能当作参数，传入第二段。
*/


/*1.2、Promise*/
// 回调函数本身并没有问题，它的问题出现在多个回调函数嵌套。假定读取A文件之后，再读取B文件，
fs.readFile(fileA, 'utf-8', function (err, data) {
  fs.readFile(fileB, 'utf-8', function (err, data) {
    // ...
  });
});
/* 
不难想象，如果依次读取两个以上的文件，就会出现多重嵌套。
代码不是纵向发展，而是横向发展，很快就会乱成一团，无法管理。
因为多个异步操作形成了强耦合，
只要有一个操作需要修改，它的上层回调函数和下层回调函数，可能都要跟着修改。
这种情况就称为"回调函数地狱"（callback hell）。
*/
/* 
Promise 对象就是为了解决这个问题而提出的。
它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。
采用 Promise，连续读取多个文件
*/
var readFile = require('fs-readfile-promise');
readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function () {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});
/* 
上面代码中，我使用了fs-readfile-promise模块，它的作用就是返回一个 Promise 版本的readFile函数。
Promise 提供then方法加载回调函数，catch方法捕捉执行过程中抛出的错误。

可以看到，Promise 的写法只是回调函数的改进，
使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。

Promise 的最大问题是代码冗余，原来的任务被 Promise 包装了一下，
不管什么操作，一眼看去都是一堆then，原来的语义变得很不清楚。
*/




/**
 * 二 、Generator 函数
 */
/*2.1、协程*/
/* 
传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。
其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

协程有点像函数，又有点像线程。它的运行流程大致如下。
第一步，协程A开始执行。
第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
第三步，（一段时间后）协程B交还执行权。
第四步，协程A恢复执行。
上面流程的协程A，就是异步任务，因为它分成两段（或多段）执行。
*/
// 举例来说，读取文件的协程写法如下。
function *asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
/* 
上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。
它表示执行到此处，执行权将交给其他协程。
也就是说，yield命令是异步两个阶段的分界线。
协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。
它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。
*/

/*2.2、协程的 Generator 函数实现*/
/* 
Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。
整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。
异步操作需要暂停的地方，都用yield语句注明。Generator 函数的执行方法如下。
*/
function* gen(x) {
  var y = yield x + 2;
  return y;
}
var g = gen(1);
g.next(); // { value: 3, done: false }
g.next(); // { value: undefined, done: true }
/* 
上面代码中，调用 Generator 函数，会返回一个内部指针（即遍历器）g。
这是 Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。
调用指针g的next方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句，
上例是执行到x + 2为止。
换言之，next方法的作用是分阶段执行Generator函数。
每次调用next方法，会返回一个对象，表示当前阶段的信息（value属性和done属性）。
value属性是yield语句后面表达式的值，表示当前阶段的值；
done属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。
*/

/*2.3、Generator 函数的数据交换和错误处理*/
/* 
Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。
*/
/* 
next法返回值的value属性，是 Generator 函数向外输出数据；
next方法还可以接受参数，向 Generator 函数体内输入数据。
*/
function* gen(x){
  var y = yield x + 2;
  return y;
}
var g = gen(1);
g.next(); // { value: 3, done: false }
g.next(2); // { value: 2, done: true }
/* 
上面代码中，第一next方法的value属性，返回表达式x + 2的值3。
第二个next方法带有参数2，这个参数可以传入 Generator 函数，
作为上个阶段异步任务的返回结果，被函数体内的变量y接收。
因此，这一步的value属性，返回的就是2（变量y的值）。
*/
/*Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。*/
function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}
var g = gen(1);
g.next();
g.throw('出错了');
// 出错了
/* 
上面代码的最后一行，Generator 函数体外，使用指针对象的throw方法抛出的错误，
可以被函数体内的try...catch代码块捕获。
这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。
*/

/*2.4、异步任务的封装*/
// 下面看看如何使用 Generator 函数，执行一个真实的异步任务。
var fetch = require('node-fetch');
function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
/* 
上面代码中，Generator 函数封装了一个异步操作，
该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息。
就像前面说过的，这段代码非常像同步操作，除了加上了yield命令。
执行这段代码的方法如下。
*/
var g = gen();
var result = g.next();
result.value       //yield等于的值
.then(function(data){
  return data.json();
})
.then(function(data){
  g.next(data);
});
/* 
上面代码中，首先执行 Generator 函数，获取遍历器对象，
然后使用next方法（第二行），执行异步任务的第一阶段。
由于Fetch模块返回的是一个 Promise 对象，因此要用then方法调用下一个next方法。

可以看到，虽然 Generator 函数将异步操作表示得很简洁，
但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。
*/




/**
 * 四、Thunk 函数
 */
/*4.1、参数的求值策略 */
/* 
Thunk 函数早在上个世纪60年代就诞生了。
那时，编程语言刚刚起步，计算机学家还在研究，
编译器怎么写比较好。一个争论的焦点是"求值策略"，即函数的参数到底应该何时求值。
*/
var x = 1;
function f(m){
  return m * 2;
}
f(x + 5);
/* 
上面代码先定义函数f，然后向它传入表达式x + 5。请问，这个表达式应该何时求值？
一种意见是"传值调用"（call by value），
即在进入函数体之前，就计算x + 5的值（等于6），再将这个值传入函数f。
C语言就采用这种策略。
*/
f(x + 5)
// 传值调用时，等同于
f(6)

/*另一种意见是“传名调用”（call by name），
即直接将表达式x + 5传入函数体，只在用到它的时候求值。
Haskell 语言采用这种策略。*/
f(x + 5)
// 传名调用时，等同于
(x + 5) * 2
/* 
传值调用和传名调用，哪一种比较好？
回答是各有利弊。
传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。
*/
function f(a, b){
  return b;
}
f(3 * x * x - 2 * x - 1, x);
/* 
上面代码中，函数f的第一个参数是一个复杂的表达式，但是函数体内根本没用到。
对这个参数求值，实际上是不必要的。因此，有一些计算机学家倾向于"传名调用"，即只在执行时求值。
*/

/*4.2、Thunk 函数的含义  */
/* 
编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，
再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
*/
function f(m) {
  return m * 2;
}
f(x + 5);
// 等同于
var thunk = function () {
  return x + 5;
};
function f(thunk) {
  return thunk() * 2;
}
/* 
上面代码中，函数f的参数x + 5被一个函数替换了。
凡是用到原参数的地方，对Thunk函数求值即可。
这就是 Thunk 函数的定义，它是“传名调用”的一种实现策略，用来替换某个表达式。
*/

/*4.3、JavaScript 语言的 Thunk 函数  */
/* 
JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。
在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，
将其替换成一个只接受回调函数作为参数的单参数函数。
*/
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);
// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};
var readFileThunk = Thunk(fileName);
readFileThunk(callback);
/* 
上面代码中，fs模块的readFile方法是一个多参数函数，两个参数分别为文件名和回调函数。
经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。
这个单参数版本，就叫做 Thunk 函数。
*/
/* 
任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。
下面是一个简单的 Thunk 函数转换器。
*/
// ES5版本：参数有回调函数
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};
// ES6版本：参数有回调函数
var Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);//call传入多参数
    }
  };
};
// 使用上面的转换器，生成fs.readFile的 Thunk 函数。
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
// 下面是另一个完整的例子。
function f(a, cb) {
  cb(a);
}
let ft = Thunk(f);
let log = console.log.bind(console);//bind绑定到console对象
ft(1)(log) // 1
/*对比柯里化函数：参数无回调函数*/
function currying(fn) {
    var out = Array.prototype.slice.call(arguments, 1);
    return function () {
        var inner = Array.prototype.slice.call(arguments);
        return fn.apply(null, out.concat(inner));
    };
}
function add(a,b,c){
	return a+b+c;
}
console.log(currying(add,4)(1,2,3));//7

/*4.4、Thunkify 模块  */
/*生产环境的转换器，建议使用 Thunkify 模块。
首先是安装。
$ npm install thunkify
使用方式如下。*/
var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('package.json')(function(err, str){
  // ...
});
Thunkify 的源码与上一节那个简单的转换器非常像。

function thunkify(fn) {
  return function() {
    var args = new Array(arguments.length);
    var ctx = this;

    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function (done) {
      var called;

      args.push(function () {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
它的源码主要多了一个检查机制，变量called确保回调函数只运行一次。这样的设计与下文的 Generator 函数相关。请看下面的例子。

function f(a, b, callback){
  var sum = a + b;
  callback(sum);
  callback(sum);
}

var ft = thunkify(f);
var print = console.log.bind(console);
ft(1, 2)(print);
// 3
上面代码中，由于thunkify只允许回调函数执行一次，所以只输出一行结果。

Generator 函数的流程管理
你可能会问， Thunk 函数有什么用？回答是以前确实没什么用，但是 ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的自动流程管理。

Generator 函数可以自动执行。

function* gen() {
  // ...
}

var g = gen();
var res = g.next();

while(!res.done){
  console.log(res.value);
  res = g.next();
}
上面代码中，Generator 函数gen会自动执行完所有步骤。

但是，这不适合异步操作。如果必须保证前一步执行完，才能执行后一步，上面的自动执行就不可行。这时，Thunk 函数就能派上用处。以读取文件为例。下面的 Generator 函数封装了两个异步操作。

var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};
上面代码中，yield命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给 Generator 函数。

这种方法就是 Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数。为了便于理解，我们先看如何手动执行上面这个 Generator 函数。

var g = gen();

var r1 = g.next();
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
});
上面代码中，变量g是 Generator 函数的内部指针，表示目前执行到哪一步。next方法负责将指针移动到下一步，并返回该步的信息（value属性和done属性）。

仔细查看上面的代码，可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入next方法的value属性。这使得我们可以用递归来自动完成这个过程。

Thunk 函数的自动流程管理
Thunk 函数真正的威力，在于可以自动执行 Generator 函数。下面就是一个基于 Thunk 函数的 Generator 执行器。

function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

function* g() {
  // ...
}

run(g);
上面代码的run函数，就是一个 Generator 函数的自动执行器。内部的next函数就是 Thunk 的回调函数。next函数先将指针移到 Generator 函数的下一步（gen.next方法），然后判断 Generator 函数是否结束（result.done属性），如果没结束，就将next函数再传入 Thunk 函数（result.value属性），否则就直接退出。

有了这个执行器，执行 Generator 函数方便多了。不管内部有多少个异步操作，直接把 Generator 函数传入run函数即可。当然，前提是每一个异步操作，都要是 Thunk 函数，也就是说，跟在yield命令后面的必须是 Thunk 函数。

var g = function* (){
  var f1 = yield readFile('fileA');
  var f2 = yield readFile('fileB');
  // ...
  var fn = yield readFile('fileN');
};

run(g);
上面代码中，函数g封装了n个异步的读取文件操作，只要执行run函数，这些操作就会自动完成。这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行。

Thunk 函数并不是 Generator 函数自动执行的唯一方案。因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权。回调函数可以做到这一点，Promise 对象也可以做到这一点。