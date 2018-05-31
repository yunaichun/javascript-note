/**
 * [基础构造器]
 * @param {[type]} model [description]
 * @param {[type]} year  [description]
 * @param {[type]} miles [description]
 */
function Car( model, year, miles ) {
  this.model = model;
  this.year = year;
  this.miles = miles;
  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}
// 我们可以示例化一个Car
var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );
// 打开浏览器控制台查看这些对象toString()方法的输出值
// output of the toString() method being called on
// these objects
console.log( civic.toString() );
console.log( mondeo.toString() );




/**
 * [Car 使用“原型”的构造器]
 * @param {[type]} model [description]
 * @param {[type]} year  [description]
 * @param {[type]} miles [description]
 */
function Car( model, year, miles ) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}
// 注意这里我们使用Note here that we are using Object.prototype.newMethod 而不是
// Object.prototype ，以避免我们重新定义原型对象
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};

var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );
console.log( civic.toString() );
console.log( mondeo.toString() );