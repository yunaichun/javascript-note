/*第一步：通用模板方法
该函数在原型上扩展了所有的基础步骤，以及主要步骤，
冲泡和加小料步骤没有实现，供具体饮料所对应的函数来实现，
另外是否加小料（customerWantsCondiments ）默认返回true，子函数重写的时候可以重写该值。
*/
var CaffeineBeverage = function () {
};
CaffeineBeverage.prototype.prepareRecipe = function () { 
    this.boilWater();
    this.brew();
    this.pourOnCup();
    if (this.customerWantsCondiments()) {
        // 如果可以想加小料，就加上
         this.addCondiments();
    }
};
CaffeineBeverage.prototype.boilWater = function () { // 烧开水（boilWater）
    console.log("将水烧开!");
};
CaffeineBeverage.prototype.brew = function () { // 冲泡（brew）
    throw new Error("该方法必须重写!");
};
CaffeineBeverage.prototype.pourOnCup = function () { // 倒在杯子里（pourOnCup）
    console.log("将饮料到再杯子里!");
};
CaffeineBeverage.prototype.addCondiments = function () {// 加小料（addCondiments）
    throw new Error("该方法必须重写!");
};
// 默认加上小料
CaffeineBeverage.prototype.customerWantsCondiments = function () {
    return true;
};



/*第二步：特定方法
下面两个函数分别是冲咖啡和冲茶所对应的函数：

另外使用confirm，可以让用户自己选择加不加小料，很不错，不是嘛？
*/
// 冲咖啡
var Coffee = function () {
    CaffeineBeverage.apply(this);
};
Coffee.prototype = new CaffeineBeverage();
Coffee.prototype.brew = function () {
    console.log("从咖啡机想咖啡倒进去!");
};
Coffee.prototype.addCondiments = function () {
    console.log("添加糖和牛奶");
};
Coffee.prototype.customerWantsCondiments = function () {
    return confirm("你想添加糖和牛奶吗？");
};

//冲茶叶
var Tea = function () {
    CaffeineBeverage.apply(this);
};
Tea.prototype = new CaffeineBeverage();
Tea.prototype.brew = function () {
    console.log("泡茶叶!");
};
Tea.prototype.addCondiments = function () {
    console.log("添加柠檬!");
};
Tea.prototype.customerWantsCondiments = function () {
    return confirm("你想添加柠檬嘛？");
};


/* 
第三步：调用方法
 */
var coffee = new Coffee();
coffee.prepareRecipe();

var tea = new Tea();
tea.prepareRecipe();



/*
模板方法应用于下列情况：

一次性实现一个算法的不变的部分，并将可变的行为留给子类来实现
各子类中公共的行为应被提取出来并集中到一个公共父类中的避免代码重复，不同之处分离为新的操作，最后，用一个钓鱼这些新操作的模板方法来替换这些不同的代码
控制子类扩展，模板方法只在特定点调用“hook”操作，这样就允许在这些点进行扩展
和策略模式不同，模板方法使用继承来改变算法的一部分，而策略模式使用委托来改变整个算法。
*/