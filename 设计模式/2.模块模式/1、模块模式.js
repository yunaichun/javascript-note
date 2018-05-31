var testModule = (function () {
  var counter = 0;
  return {
    incrementCounter: function () {
      return counter++;
    },
    resetCounter: function () {
      console.log( "counter value prior to reset: " + counter );
      counter = 0;
    }
  };
})();
// Increment our counter
testModule.incrementCounter();
// Check the counter value and reset
// Outputs: 1
testModule.resetCounter();
/* 优点：
既然我们已经看到单例模式很有用，为什么还是使用模块模式呢？
首先，对于有面向对象背景的开发者来讲，至少从javascript语言上来讲，模块模式相对于真正的封装概念更清晰。

其次，模块模式支持私有数据-因此，在模块模式中，公共部分代码可以访问私有数据，
但是在模块外部，不能访问类的私有部分
*/
/*
其它缺点包括不能为私有成员创建自动化的单元测试，以及在紧急修复bug时所带来的额外的复杂性。根本没有可能可以对私有成员打补丁。
相反地，我们必须覆盖所有的使用存在bug私有成员的公共方法。开发者不能简单的扩展私有成员，
因此我们需要记得，私有成员并非它们表面上看上去那么具有扩展性。
*/