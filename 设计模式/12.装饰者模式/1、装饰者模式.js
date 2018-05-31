/*
装饰者模式是为已有功能动态地添加更多功能的一种方式，
把每个要装饰的功能放在单独的函数里，然后用该函数包装所要装饰的已有函数对象，
因此，当需要执行特殊行为的时候，调用代码就可以根据需要有选择地、按顺序地使用装饰功能来包装对象。
优点是把类（函数）的核心职责和装饰功能区分开了。
*/
var tree = {};
/**
 * [decorate 可以被覆盖的对象属性]
 * @return {[type]} [description]
 */
tree.decorate = function () {
    console.log('Make sure the tree won\'t fall');
};
/**
 * [getDecorator 将tree对象的属性扩展到tree.'deco'.prototype]
 * @param  {[type]} deco [传入装饰者]
 * @return {[type]}      [description]
 */
tree.getDecorator = function (deco) {
    tree[deco].prototype = this; // 得到的是tree.'deco'.prototype = tree
    console.log(1000000, new tree[deco]);
    return new tree[deco];//实例化指定的tree
};

/**
 * [RedBalls 覆盖decorate方法]
 */
tree.RedBalls = function () {
    // 覆盖掉tree.decorate方法
    this.decorate = function () {
        // 需要是prototype中的方法
        this.RedBalls.prototype.decorate(); // 第7步：先执行原型（这时候是Angel了）的decorate方法
        console.log('Put on some red balls'); // 第8步 再输出 red
        // 将这2步作为RedBalls的decorate方法
    }
};
/**
 * [BlueBalls 覆盖decorate方法]
 */
tree.BlueBalls = function () {
    // 覆盖掉tree.decorate方法
    this.decorate = function () {
        // 需要是prototype中的方法
        this.BlueBalls.prototype.decorate(); // 第1步：先执行原型的decorate方法，也就是tree.decorate()
        console.log('Add blue balls'); // 第2步 再输出blue
        // 将这2步作为BlueBalls的decorate方法
    }
};
/**
 * [Angel 覆盖decorate方法]
 */
tree.Angel = function () {
    // 覆盖掉tree.decorate方法
    this.decorate = function () {
        // 需要是prototype中的方法
        this.Angel.prototype.decorate(); // 第4步：先执行原型（这时候是BlueBalls了）的decorate方法
        console.log('An angel on the top'); // 第5步 再输出angel
        // 将这2步作为Angel的decorate方法
    }
};


//{ Angel: ƒ (), BlueBalls: ƒ (), RedBalls: ƒ (), decorate: ƒ (), getDecorator: ƒ (eco) }
console.log('最初的tree对象', tree);


tree = tree.getDecorator('BlueBalls'); // 第3步：将BlueBalls对象赋给tree，这时候父原型里的getDecorator依然可用
tree.decorate(); //其实获取的是tree.BlueBalls
console.log(111, tree);// tree.BlueBalls { decorate: ƒ }


tree = tree.getDecorator('Angel'); // 第6步：将Angel对象赋给tree，这时候父原型的父原型里的getDecorator依然可用
tree.decorate();
console.log(222, tree);// tree.Angel { decorate: ƒ }


tree = tree.getDecorator('RedBalls'); // 第9步：将RedBalls对象赋给tree
tree.decorate(); // 第10步：执行RedBalls对象的decorate方法
console.log(333, tree);// tree.RedBalls { decorate: ƒ }
