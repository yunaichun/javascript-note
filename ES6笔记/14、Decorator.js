/**
 * 一、类的修饰
 */
/*1.1、修饰器传入一个参数*/
/*
修饰器（Decorator）是一个函数，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持。
修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。
*/
function testable(target) {
  target.isTestable = true;
}
@testable
class MyTestableClass {}
console.log(MyTestableClass.isTestable) // true
/*
上面代码中，@testable就是一个修饰器。它修改了MyTestableClass这个类的行为，
为它加上了静态属性isTestable。
基本上，修饰器的行为就是下面这样。
*/
@decorator
class A {}
// 等同于
class A {}
A = decorator(A) || A;
/*
也就是说，修饰器本质就是编译时执行的函数。
修饰器函数的第一个参数，就是所要修饰的目标类。
*/
function testable(target) {
  // ...
}
/*
上面代码中，testable函数的参数target，就是会被修饰的类。
*/

/*1.2、修饰七传入两个参数*/
/*
如果觉得一个参数不够用，可以在修饰器外面再封装一层函数。
下面代码中，修饰器testable可以接受参数，这就等于可以修改修饰器的行为。
*/
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}
@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true
@testable(false)
class MyClass {}
MyClass.isTestable // false

/*1.3、修饰实例属性*/
/*
前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的prototype对象操作。
下面代码中，修饰器函数testable是在目标类的prototype对象上添加属性，因此就可以在实例上调用。
*/
function testable(target) {
  target.prototype.isTestable = true;
}
@testable
class MyTestableClass {}
let obj = new MyTestableClass();
obj.isTestable // true


/*1.4、修饰实例方法*/
// mixins.js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}
// main.js
import { mixins } from './mixins'
const Foo = {
  foo() { console.log('foo') }
};
@mixins(Foo)
class MyClass {}
let obj = new MyClass();
obj.foo() // 'foo'
/*
上面代码通过修饰器mixins，把Foo类的方法添加到了MyClass的实例上面。
可以用Object.assign()模拟这个功能。
*/
const Foo = {
  foo() { console.log('foo') }
};
class MyClass {}
Object.assign(MyClass.prototype, Foo);
let obj = new MyClass();
obj.foo() // 'foo'




/**
 * 二、方法的修饰
 */
/*2.1、修饰class的属性*/
/*
修饰器不仅可以修饰类，还可以修饰类的属性。
下面代码中，修饰器readonly用来修饰“类”的name方法。
*/
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}
/*
此时，修饰器函数一共可以接受三个参数，
第一个参数是所要修饰的目标对象，
第二个参数是所要修饰的属性名，
第三个参数是该属性的描述对象。
*/
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}
readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
/*
上面代码说明，修饰器（readonly）会修改属性的描述对象（descriptor），
然后被修改的描述对象再用来定义属性。
*/

/*2.2、修饰class的numerable属性*/
/*下面是另一个例子，修改属性描述对象的enumerable属性，使得该属性不可遍历。*/
class Person {
  @nonenumerable
  get kidCount() { return this.children.length; }
}
function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}

/*2.3、输出日志*/
/*
下面代码中，@log修饰器的作用就是在执行原始的操作之前，执行一次console.log，
从而达到输出日志的目的。
*/
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}
function log(target, name, descriptor) {
  var oldValue = descriptor.value;
  descriptor.value = function() {
    console.log(`Calling "${name}" with`, arguments);
    return oldValue.apply(null, arguments);
  };
  return descriptor;
}
const math = new Math();
// passed parameters should get logged now
math.add(2, 4);

/*2.4、修饰器有注释的作用。*/
@testable
class Person {
  @readonly
  @nonenumerable
  name() { return `${this.first} ${this.last}` }
}
/*
从上面代码中，我们一眼就能看出，Person类是可测试的，而name方法是只读和不可枚举的。
如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。
*/
function dec(id){
    console.log('evaluated', id);
    return (target, property, descriptor) => console.log('executed', id);
}
class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
/*
上面代码中，外层修饰器@dec(1)先进入，但是内层修饰器@dec(2)先执行。
除了注释，修饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。
从长期来看，它将是JavaScript代码静态分析的重要工具。
*/




/**
 * 三、为什么修饰器不能用于函数？
 */
/*修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。*/
var counter = 0;
var add = function () {
  counter++;
};
@add
function foo() {
}
/*
上面的代码，意图是执行后counter等于1，但是实际上结果是counter等于0。
因为函数提升，使得实际执行的代码是下面这样。
*/
@add
function foo() {
}
var counter;
var add;
counter = 0;
add = function () {
  counter++;
};
/*下面是另一个例子。*/
var readOnly = require("some-decorator");
@readOnly
function foo() {
}
/*上面代码也有问题，因为实际执行是下面这样。*/
var readOnly;
@readOnly
function foo() {
}
readOnly = require("some-decorator");
/*
总之，由于存在函数提升，使得修饰器不能用于函数。
类是不会提升的，所以就没有这方面的问题。
*/





/**
 * 四、core-decorators.js
 */
/*
core-decorators.js是一个第三方模块，
提供了几个常见的修饰器，通过它可以更好地理解修饰器。
*/
/*4.1、@autobind*/
/*autobind修饰器使得方法中的this对象，绑定原始对象。*/
import { autobind } from 'core-decorators';
class Person {
  @autobind
  getPerson() {
    return this;
  }
}
let person = new Person();
let getPerson = person.getPerson;
getPerson() === person;// true

/*4.2、@readonly*/
/*readonly修饰器使得属性或方法不可写。*/
import { readonly } from 'core-decorators';
class Meal {
  @readonly
  entree = 'steak';
}
var dinner = new Meal();
dinner.entree = 'salmon';// Cannot assign to read only property 'entree' of [object Object]

/*4.3、@override*/
/*
override修饰器检查子类的方法，
是否正确覆盖了父类的同名方法，如果不正确会报错。
*/
import { override } from 'core-decorators';
class Parent {
  speak(first, second) {}
}
class Child extends Parent {
  @override
  speak() {}
  // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
}
// or
class Child extends Parent {
  @override
  speaks() {}
  // SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
  //
  //   Did you mean "speak"?
}

/*4.4、@deprecate (别名@deprecated)*/
/*deprecate或deprecated修饰器在控制台显示一条警告，表示该方法将废除。*/
import { deprecate } from 'core-decorators';
class Person {
  @deprecate
  facepalm() {}
  @deprecate('We stopped facepalming')
  facepalmHard() {}
  @deprecate('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' })
  facepalmHarder() {}
}
let person = new Person();
person.facepalm();
// DEPRECATION Person#facepalm: This function will be removed in future versions.
person.facepalmHard();
// DEPRECATION Person#facepalmHard: We stopped facepalming
person.facepalmHarder();
// DEPRECATION Person#facepalmHarder: We stopped facepalming
//
//     See http://knowyourmeme.com/memes/facepalm for more details.
//

/*4.5、@suppressWarnings*/
/*
suppressWarnings修饰器抑制decorated修饰器导致的console.warn()调用。
但是，异步代码发出的调用除外。
*/
import { suppressWarnings } from 'core-decorators';
class Person {
  @deprecated
  facepalm() {}
  @suppressWarnings
  facepalmWithoutWarning() {
    this.facepalm();
  }
}
let person = new Person();
person.facepalmWithoutWarning();
// no warning is logged






/**
 * 五、使用修饰器实现自动发布事件
 */
/*
我们可以使用修饰器，使得对象的方法被调用时，自动发出一个事件。
下面代码定义了一个名为publish的修饰器，它通过改写descriptor.value，
使得原方法被调用时，会自动发出一个事件。它使用的事件“发布/订阅”库是Postal.js。
*/
import postal from "postal/lib/postal.lodash";
export default function publish(topic, channel) {
  return function(target, name, descriptor) {
    const fn = descriptor.value;
    descriptor.value = function() {
      let value = fn.apply(this, arguments);
      postal.channel(channel || target.channel || "/").publish(topic, value);
    };
  };
}
/*它的用法如下。*/
import publish from "path/to/decorators/publish";
class FooComponent {
  @publish("foo.some.message", "component")
  someMethod() {
    return {
      my: "data"
    };
  }
  @publish("foo.some.other")
  anotherMethod() {
    // ...
  }
}
/*以后，只要调用someMethod或者anotherMethod，就会自动发出一个事件。*/
let foo = new FooComponent();
foo.someMethod() // 在"component"频道发布"foo.some.message"事件，附带的数据是{ my: "data" }
foo.anotherMethod() // 在"/"频道发布"foo.some.other"事件，不附带数据






/**
 * 六、Mixin
 */
/*6.1、基本混入*/
/*
在修饰器的基础上，可以实现Mixin模式。所谓Mixin模式，
就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。
请看下面的例子。
*/
const Foo = {
  foo() { console.log('foo') }
};
class MyClass {}
Object.assign(MyClass.prototype, Foo);
let obj = new MyClass();
obj.foo() // 'foo'
/*
上面代码之中，对象Foo有一个foo方法，
通过Object.assign方法，可以将foo方法“混入”MyClass类，
导致MyClass的实例obj对象都具有foo方法。这就是“混入”模式的一个简单实现。
下面，我们部署一个通用脚本mixins.js，将mixin写成一个修饰器。
*/
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}
/*
然后，就可以使用上面这个修饰器，为类“混入”各种方法。
通过mixins这个修饰器，实现了在MyClass类上面“混入”Foo对象的foo方法。
*/
import { mixins } from './mixins';
const Foo = {
  foo() { console.log('foo') }
};
@mixins(Foo)
class MyClass {}
let obj = new MyClass();
obj.foo() // "foo"
/*
不过，上面的方法会改写MyClass类的prototype对象，
如果不喜欢这一点，也可以通过类的继承实现mixin。
*/
class MyClass extends MyBaseClass {
  /* ... */
}
/*
上面代码中，MyClass继承了MyBaseClass。
如果我们想在MyClass里面“混入”一个foo方法，
一个办法是在MyClass和MyBaseClass之间插入一个混入类，这个类具有foo方法，
并且继承了MyBaseClass的所有方法，然后MyClass再继承这个类。
*/
let MyMixin = (superclass) => class extends superclass {
  foo() {
    console.log('foo from MyMixin');
  }
};
/*
上面代码中，MyMixin是一个混入类生成器，接受superclass作为参数，
然后返回一个继承superclass的子类，该子类包含一个foo方法。
接着，目标类再去继承这个混入类，就达到了“混入”foo方法的目的。
*/
class MyClass extends MyMixin(MyBaseClass) {
  /* ... */
}
let c = new MyClass();
c.foo(); // "foo from MyMixin"

/*6.2、混入多个方法*/
/*如果需要“混入”多个方法，就生成多个混入类。*/
class MyClass extends Mixin1(Mixin2(MyBaseClass)) {
  /* ... */
}
/*
这种写法的一个好处，是可以调用super，
因此可以避免在“混入”过程中覆盖父类的同名方法。
*/
let Mixin1 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin1');
    if (super.foo) super.foo();
  }
};
let Mixin2 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin2');
    if (super.foo) super.foo();
  }
};
class S {
  foo() {
    console.log('foo from S');
  }
}
class C extends Mixin1(Mixin2(S)) {
  foo() {
    console.log('foo from C');
    super.foo();
  }
}
/*
上面代码中，每一次混入发生时，都调用了父类的super.foo方法，
导致父类的同名方法没有被覆盖，行为被保留了下来。
*/
new C().foo()
// foo from C
// foo from Mixin1
// foo from Mixin2
// foo from S





/**
 * 七、Trait
 */
/*7.1、简介*/
/*
Trait也是一种修饰器，效果与Mixin类似，
但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等。
*/
/*
下面采用traits-decorator这个第三方模块作为例子。
这个模块提供的traits修饰器，不仅可以接受对象，还可以接受ES6类作为参数。
*/
import { traits } from 'traits-decorator';
class TFoo {
  foo() { console.log('foo') }
}
const TBar = {
  bar() { console.log('bar') }
};
@traits(TFoo, TBar)
class MyClass { }
let obj = new MyClass();
obj.foo() // foo
obj.bar() // bar
/*上面代码中，通过traits修饰器，在MyClass类上面“混入”了TFoo类的foo方法和TBar对象的bar方法。*/

/*7.2、Trait不允许“混入”同名方法*/
import { traits } from 'traits-decorator';
class TFoo {
  foo() { console.log('foo') }
}
const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};
@traits(TFoo, TBar)
class MyClass { }
// 报错
// throw new Error('Method named: ' + methodName + ' is defined twice.');
//        ^
// Error: Method named: foo is defined twice.
/*上面代码中，TFoo和TBar都有foo方法，结果traits修饰器报错。*/

/*7.3、Trait“混入”同名方法的解决办法*/
/* 
一种解决方法是排除TBar的foo方法。
下面代码使用绑定运算符（::）在TBar上排除foo方法，混入时就不会报错了。
*/
import { traits, excludes } from 'traits-decorator';
class TFoo {
  foo() { console.log('foo') }
}
const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};
@traits(TFoo, TBar::excludes('foo'))
class MyClass { }
let obj = new MyClass();
obj.foo() // foo
obj.bar() // bar
/* 
另一种方法是为TBar的foo方法起一个别名。
下面代码为TBar的foo方法起了别名aliasFoo，于是MyClass也可以混入TBar的foo方法了。
*/
import { traits, alias } from 'traits-decorator';
class TFoo {
  foo() { console.log('foo') }
}
const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};
@traits(TFoo, TBar::alias({foo: 'aliasFoo'}))
class MyClass { }
let obj = new MyClass();
obj.foo() // foo
obj.aliasFoo() // foo
obj.bar() // bar

/*7.4、alias和excludes方法，可以结合起来使用*/
@traits(TExample::excludes('foo','bar')::alias({baz:'exampleBaz'}))
class MyClass {}
/*
上面代码排除了TExample的foo方法和bar方法，
为baz方法起了别名exampleBaz。
as方法则为上面的代码提供了另一种写法。
*/
@traits(TExample::as({excludes:['foo', 'bar'], alias: {baz: 'exampleBaz'}}))
class MyClass {}





/**
 * 八、Babel转码器的支持
 */
/*
目前，Babel转码器已经支持Decorator。
首先，安装babel-core和babel-plugin-transform-decorators。
由于后者包括在babel-preset-stage-0之中，所以改为安装babel-preset-stage-0亦可。
$ npm install babel-core babel-plugin-transform-decorators
*/
/*然后，设置配置文件.babelrc。*/
{
  "plugins": ["transform-decorators"]
}
/*
这时，Babel就可以对Decorator转码了。
脚本中打开的命令如下。
*/
babel.transform("code", {plugins: ["transform-decorators"]})
/*Babel的官方网站提供一个在线转码器，只要勾选Experimental，就能支持Decorator的在线转码。*/