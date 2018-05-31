/**
 * [示例1：带有新功能的装饰构造器]
 * @param  {[type]} vehicleType [description]
 * @return {[type]}             [description]
 */
function vehicle( vehicleType ){
    this.vehicleType = vehicleType || "car";
    this.model = "default";
    this.license = "00000-000";

}
var testInstance = new vehicle( "car" );
console.log( testInstance );//{ vehicle: car, model: default, license: 00000-000 }


// Lets create a new instance of vehicle, to be decorated
var truck = new vehicle( "truck" );
// New functionality we're decorating vehicle with
truck.setModel = function( modelName ){
    this.model = modelName;
};
truck.setColor = function( color ){
    this.color = color;
};
// Test the value setters and value assignment works correctly
truck.setModel( "CAT" );
truck.setColor( "blue" );
console.log( truck );{ vehicle:truck, model:CAT, color: blue }


// Demonstrate "vehicle" is still unaltered
var secondInstance = new vehicle( "car" );
console.log( secondInstance );//{ vehicle: car, model:default, license: 00000-000 }







/**
 * [示例2：带有多个装饰器的装饰对象]
 * @return {[type]}             [description]
 */
function MacBook() {
  this.cost = function () { return 997; };
  this.screenSize = function () { return 11.6; };
}
// Decorator 1[重写初始值和cost计算函数]
function Memory( macbook ) {
  var v = macbook.cost();
  console.log(v);
  macbook.cost = function() { //相当于重写原cost方法
    return v + 75;
  };
}
// Decorator 2
function Engraving( macbook ){
  var v = macbook.cost();
  console.log(v);
  macbook.cost = function(){ //相当于重写原cost方法
    return  v + 200;
  };
}
// Decorator 3
function Insurance( macbook ){
  var v = macbook.cost();
  console.log(v);
  macbook.cost = function(){ //相当于重写原cost方法
     return  v + 250;
  };
}
var mb = new MacBook();
console.log(mb);
Memory( mb );
Engraving( mb );
Insurance( mb );

console.log( mb.cost() );// Outputs: 1522
console.log( mb.screenSize() );// Outputs: 11.6







/* 接口：---
PJDP所描述的装饰器是一种被用于将具备相同接口的对象进行透明封装的对象，这样一种模式。
接口是一种定义一个对象应该具有哪些方法的途径，然而，它实际上并不指定那些方法应该如何实现。


Create interfaces using a pre-defined Interface
constructor that accepts an interface name and skeleton methods to expose.

In our reminder example summary() and placeOrder()
represent functionality the interface should
support 
*/
var reminder = new Interface( "List", ["summary", "placeOrder"] );//传入接口名称+暴露的方法函数的列表

var properties = {
  name: "Remember to buy the milk",
  date: "05/06/2016",
  actions:{
    summary: function (){
      return "Remember to buy the milk, we are almost out!";
   },
    placeOrder: function (){
      return "Ordering milk from your local grocery store";
    }
  }
};

// Now create a constructor implementing the above properties and methods
function Todo( config ){
  // State the methods we expect to be supported
  // as well as the Interface instance being checked against
  Interface.ensureImplements( config.actions, reminder ); //继承reminder的接口
  this.name = config.name; //属性名
  this.methods = config.actions; //方法
}

// Create a new instance of our Todo constructor
var todoItem = Todo( properties );

// Finally test to make sure these function correctly
console.log( todoItem.methods.summary() ); // Remember to buy the milk, we are almost out!
console.log( todoItem.methods.placeOrder() );// Ordering milk from your local grocery store






/**
 * [抽象装饰者]
 * @type {Interface}
 */
var Macbook = new Interface( "Macbook", [ "addEngraving", "addParallels", "add4GBRam", "add8GBRam", "addCase" ] );

// A Macbook Pro might thus be represented as follows:
var MacbookPro = function(){
    // implements Macbook
};
MacbookPro.prototype = {
    addEngraving: function(){
    },
    addParallels: function(){
    },
    add4GBRam: function(){
    },
    add8GBRam:function(){
    },
    addCase: function(){
    },
    getPrice: function(){
      // Base price
      return 900.00;        
    }
};

// Macbook decorator abstract decorator class
var MacbookDecorator = function( macbook ){
    Interface.ensureImplements( macbook, Macbook );//继承Macbook的接口
    this.macbook = macbook; 
};
MacbookDecorator.prototype = {
    addEngraving: function(){
        return this.macbook.addEngraving();
    },
    addParallels: function(){
        return this.macbook.addParallels();
    },
    add4GBRam: function(){
        return this.macbook.add4GBRam();
    },
    add8GBRam:function(){
        return this.macbook.add8GBRam();
    },
    addCase: function(){
        return this.macbook.addCase();
    },
    getPrice: function(){
        return this.macbook.getPrice();
    }       
};

// 通过简单调用超类的构造器和根据需要可以被重载的方法
var CaseDecorator = function( macbook ){
   // call the superclass's constructor next
   this.superclass.constructor( macbook );  
};
// Let's now extend the superclass
extend( CaseDecorator, MacbookDecorator ); //继承超类
CaseDecorator.prototype.addCase = function(){
    return this.macbook.addCase() + "Adding case to macbook";  
};
CaseDecorator.prototype.getPrice = function(){
    return this.macbook.getPrice() + 45.00; 
};

// Instantiation of the macbook
var myMacbookPro = new MacbookPro(); 
console.log( myMacbookPro.getPrice() );// Outputs: 900.00
// Decorate the macbook
myMacbookPro = new CaseDecorator( myMacbookPro );
console.log( myMacbookPro.getPrice() );// This will return 945.00




/*优点：
因为它可以被透明的使用，并且也相当的灵活，因此开发者都挺乐意去使用这个模式——如我们所见，
对象可以用新的行为封装或者“装饰”起来，而后继续使用，并不用去担心基础的对象被改变。在一个更加广泛的范围内，
这一模式也避免了我们去依赖大量子类来实现同样的效果
*/
/*缺点：
然而在实现这个模式时，也存在我们应该意识到的缺点。
如果穷于管理，它也会由于引入了许多微小但是相似的对象到我们的命名空间中，
从而显著的使得我们的应用程序架构变得复杂起来。这里所担忧的是，
除了渐渐变得难于管理，其他不能熟练使用这个模式的开发者也可能会有一段要掌握它被使用的理由的艰难时期。
*/