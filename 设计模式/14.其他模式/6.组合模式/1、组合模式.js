/*第一步：先实现我们的“抽象类”函数MenuComponent

该函数提供了2种类型的方法，一种是获取信息的，比如价格，名称等，
另外一种是通用操作方法，比如打印、添加、删除、获取子菜单。
*/
var MenuComponent = function () {
};
MenuComponent.prototype.getName = function () {//获取菜品名称
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.getPrice = function () {//获取价格
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.getDescription = function () {//获取菜品简介
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.isVegetarian = function () {//是否是素食
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.print = function () {//打印
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.add = function () {//添加
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.remove = function () {//删除
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.getChild = function () {//获取子菜单
    throw new Error("该方法必须重写!");
};




/*
第二步：创建基本的菜品项

由代码可以看出，我们只重写了原型的4个获取信息的方法和print方法，没有重载其它3个操作方法，
因为基本菜品不包含添加、删除、获取子菜品的方式。
*/
var MenuItem = function (sName, sDescription, bVegetarian, nPrice) {
    MenuComponent.apply(this);
    this.sName = sName;
    this.sDescription = sDescription;
    this.bVegetarian = bVegetarian;
    this.nPrice = nPrice;
};
MenuItem.prototype = new MenuComponent();
MenuItem.prototype.getName = function () {
    return this.sName;
};
MenuItem.prototype.getDescription = function () {
    return this.sDescription;
};
MenuItem.prototype.getPrice = function () {
    return this.nPrice;
};
MenuItem.prototype.isVegetarian = function () {
    return this.bVegetarian;
};
MenuItem.prototype.print = function () {
    console.log(this.getName() + ": " + this.getDescription() + ", " + this.getPrice() + "euros");
};




/*
第三步，创建菜品

注意上述代码，除了实现了添加、删除、获取方法外，
打印print方法是首先打印当前菜品信息，然后循环遍历打印所有子菜品信息。
*/
var Menu = function (sName, sDescription) {
    MenuComponent.apply(this);
    this.aMenuComponents = [];
    this.sName = sName;
    this.sDescription = sDescription;
    this.createIterator = function () {
        throw new Error("This method must be overwritten!");
    };
};
Menu.prototype = new MenuComponent();
Menu.prototype.getChild = function (nIndex) {
    //获取指定的子菜品
    return this.aMenuComponents[nIndex];
};
Menu.prototype.getName = function () {
    return this.sName;
};
Menu.prototype.getDescription = function () {
    return this.sDescription;
};
Menu.prototype.add = function (oMenuComponent) {
    // 添加子菜品
    this.aMenuComponents.push(oMenuComponent);
};
Menu.prototype.remove = function (oMenuComponent) {
    // 删除子菜品
    var aMenuItems = [];

    var currentItem = null;
    for (var i = 0, len = this.aMenuComponents.length; i < len; i++) {
        currentItem = this.aMenuComponents[i];
        if (currentItem !== oMenuComponent) {
            aMenuItems.push(currentItem);
        }
    }
    this.aMenuComponents = aMenuItems;
};
Menu.prototype.print = function () {
    // 打印当前菜品以及所有的子菜品
    console.log(this.getName() + ": " + this.getDescription());
    console.log("--------------------------------------------");

    var oMenuComponent = null;
    for (var i = 0, len = this.aMenuComponents.length; i < len; i++) {
        oMenuComponent = this.aMenuComponents[i];
        oMenuComponent.print();
    }
};




/*
第四步，创建指定的菜品

我们可以创建几个真实的菜品，比如晚餐、咖啡、糕点等等，其都是用Menu作为其原型，代码如下：
*/
var DinnerMenu = function () {
    Menu.apply(this);
};
DinnerMenu.prototype = new Menu();

var CafeMenu = function () {
    Menu.apply(this);
};
CafeMenu.prototype = new Menu();

var PancakeHouseMenu = function () {
    Menu.apply(this);
};
PancakeHouseMenu.prototype = new Menu();




/*
第五步，创建最顶级的菜单容器——菜单本

该函数接收一个菜单数组作为参数，并且值提供了printMenu方法用于打印所有的菜单内容。
*/
var Mattress = function (aMenus) {
    this.aMenus = aMenus;
};
Mattress.prototype.printMenu = function () {
    this.aMenus.print();
};




/*
第六步，调用方式
*/
var oPanCakeHouseMenu = new Menu("Pancake House Menu", "Breakfast");
var oDinnerMenu = new Menu("Dinner Menu", "Lunch");
var oCoffeeMenu = new Menu("Cafe Menu", "Dinner");
var oAllMenus = new Menu("ALL MENUS", "All menus combined");

oAllMenus.add(oPanCakeHouseMenu);
oAllMenus.add(oDinnerMenu);

oDinnerMenu.add(new MenuItem("Pasta", "Spaghetti with Marinara Sauce, and a slice of sourdough bread", true, 3.89)); // 添加具体菜品
oDinnerMenu.add(oCoffeeMenu); // 添加子菜单

oCoffeeMenu.add(new MenuItem("Express", "Coffee from machine", false, 0.99)); // 子菜添加具体菜品

var oMattress = new Mattress(oAllMenus);
console.log("---------------------------------------------");
oMattress.printMenu();
console.log("---------------------------------------------");




/*
组合模式的使用场景非常明确：

你想表示对象的部分-整体层次结构时；
你希望用户忽略组合对象和单个对象的不同，用户将统一地使用组合结构中的所有对象（方法）
另外该模式经常和装饰者一起使用，它们通常有一个公共的父类（也就是原型），因此装饰必须支持具有add、remove、getChild操作的 component接口。
*/