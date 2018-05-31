/* 
如果我们想做到只有在使用的时候才初始化，那该如何做呢？

单例模式之所以这么叫，是因为它限制一个类只能有一个实例化对象。
经典的实现方式是，创建一个类，这个类包含一个方法，这个方法在没有对象存在的情况下，
将会创建一个新的实例对象。如果对象存在，这个方法只是返回这个对象的引用。
*/
var mySingleton = (function () {
  // Instance stores a reference to the Singleton
  var instance;
  function init() {
    // 单例
    // 私有方法和变量
    function privateMethod(){
        console.log( "I am private" );
    }
    var privateVariable = "Im also private";
    var privateRandomNumber = Math.random();
    return {
      // 共有方法和变量
      publicMethod: function () {
        console.log( "The public can see me!" );
      },
      publicProperty: "I am also public",
      getRandomNumber: function() {
        return privateRandomNumber;
      }
    };
  };
  return {
    // 如果存在获取此单例实例，如果不存在创建一个单例实例
    getInstance: function () {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    }
  };
})();

var myBadSingleton = (function () {
  // 存储单例实例的引用
  var instance;
  function init() {
    // 单例
    var privateRandomNumber = Math.random();
    return {
      getRandomNumber: function() {
        return privateRandomNumber;
      }
    };
  };
  return {
    // 总是创建一个新的实例
    getInstance: function () {
      instance = init();
      return instance;
    }
  };
})();

// 使用:
var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log( badSingleA.getRandomNumber() !== badSingleB.getRandomNumber() ); // true