function Animal(name) {
    if(!(this instanceof Animal)) {
        return new Animal(name);
    }
    this.name = name;
}
var animal = Animal("wangwang");
console.log(animal);//Animal
console.log(Animal.prototype.constructor === Animal); // true




/* 
构造函数有return值怎么办？
构造函数里没有显式调用return时，默认是返回this对象，也就是新创建的实例对象。
当构造函数里调用return时，分两种情况：
A.return的是五种简单数据类型：String，Number，Boolean，Null，Undefined。
这种情况下，忽视return值，依然返回this对象。
B.return的是Object
这种情况下，不再返回this对象，而是返回return语句的返回值。
*/

