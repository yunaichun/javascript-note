/**
 * [Person 超类]
 * @param {[type]} firstName [description]
 * @param {[type]} lastName  [description]
 */
var Person =  function( firstName , lastName ){
  this.firstName = firstName;
  this.lastName =  lastName;
  this.gender = "male";
};
// a new instance of Person can then easily be created as follows:
var clark = new Person( "Clark" , "Kent" );

/**
 * [Superhero 子类]
 * @param {[type]} firstName [description]
 * @param {[type]} lastName  [description]
 * @param {[type]} powers    [子类特有属性]
 */
var Superhero = function( firstName, lastName , powers ){
    // Invoke the superclass constructor on the new object
    // then use .call() to invoke the constructor as a method of
    // the object to be initialized.
    Person.call( this, firstName, lastName );
    // Finally, store their powers, a new array of traits not found in a normal "Person"
    this.powers = powers;
};
SuperHero.prototype = Object.create( Person.prototype );
var superman = new Superhero( "Clark" ,"Kent" , ["flight","heat-vision"] );
console.log( superman );// Outputs Person attributes as well as powers




/* 非实例化继承，继承所有的方法
 * [将myMixins对象的方法混入到不同的对象中去]
 * @type {Object}
 */
var myMixins = {
  moveUp: function(){
    console.log( "move up" );
  },
  moveDown: function(){
    console.log( "move down" );
  },
  stop: function(){
    console.log( "stop! in the name of love!" );
  }
};
// A skeleton carAnimator constructor
function carAnimator(){
  this.moveLeft = function(){
    console.log( "move left" );
  };
}
// A skeleton personAnimator constructor
function personAnimator(){
  this.moveRandomly = function(){ /*..*/ };
}
// Extend both constructors with our Mixin
_.extend( carAnimator.prototype, myMixins );//将其他类的方法混入
_.extend( personAnimator.prototype, myMixins );//将其他类的方法混入
// Create a new instance of carAnimator
var myAnimator = new carAnimator();
myAnimator.moveLeft();// move left
myAnimator.moveDown();// move down
myAnimator.stop();// stop! in the name of love!




/* 实例化继承，继承指定的方法[不用Underscore.js类库]
 *如我们所见,这允许我们将通用的行为轻易的"混"入相当普通对象构造器中。

 *在接下来的示例中,我们有两个构造器:一个Car和一个Mixin.
 *我们将要做的是静Car参数化(另外一种说法是扩展),以便它能够继承Mixin中的特定方法,名叫driveForwar()和driveBackward().

 *这一次我们不会使用Underscore.js。取而代之，这个示例将演示如何将一个构造器参数化，
 *以便在无需重复每一个构造器函数过程的前提下包含其功能。
*/
// Define a simple Car constructor
var Car = function ( settings ) {
    this.model = settings.model || "no model provided";
    this.color = settings.color || "no colour provided";
};

// Mixin
var Mixin = function () {};
Mixin.prototype = {
    driveForward: function () {
        console.log( "drive forward" );
    },
    driveBackward: function () {
        console.log( "drive backward" );
    },
    driveSideways: function () {
        console.log( "drive sideways" );
    }
};

// Extend an existing object with a method from another
function augment( receivingClass, givingClass ) {
    // only provide certain methods
    if ( arguments[2] ) { //传入超过2个参数，只继承后续参数指定的方法
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {
            // check to make sure the receiving class doesn't
            // have a method of the same name as the one currently
            // being processed
            if ( !Object.hasOwnProperty(receivingClass.prototype, methodName) ) { //不存在全部拷贝
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
            // Alternatively:
            // if ( !receivingClass.prototype[methodName] ) {
            //  receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            // }
        }
    }
}

// 只混入指定的方法："driveForward" + "driveBackward"
augment( Car, Mixin, "driveForward", "driveBackward" );
var myCar = new Car({
    model: "Ford Escort",
    color: "blue"
});
myCar.driveForward();// drive forward
myCar.driveBackward();// drive backward

// 混入所有的方法
augment( Car, Mixin );
var mySportsCar = new Car({
    model: "Porsche",
    color: "red"
});
mySportsCar.driveSideways();// drive sideways





/* 优点：
Mixin支持在一个系统中降解功能的重复性,增加功能的重用性.
在一些应用程序也许需要在所有的对象实体共享行为的地方,我们能够通过在一个Mixin中维护这个共享的功能,
来很容易的避免任何重复,而因此专注于只实现我们系统中真正彼此不同的功能。
*/

/* 缺点：
也就是说,对Mixin的副作用是值得商榷的.一些开发者感觉将功能注入到对象的原型中是一个坏点子,
因为它会同时导致原型污染和一定程度上的对我们原有功能的不确定性.在大型的系统中,很可能是有这种情况的。

我认为,强大的文档对最大限度的减少对待功能中的混入源的迷惑是有帮助的,而且对于每一种模式而言,
如果在实现过程中小心行事,我们应该是没多大问题的。
*/