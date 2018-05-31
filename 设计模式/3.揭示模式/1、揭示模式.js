var myRevealingModule = function () {

    var privateVar = "Ben Cherry",
        publicVar  = "Hey there!";
    function privateFunction() {
        console.log( "Name:" + privateVar );
    }
    function publicSetName( strName ) {
        privateVar = strName;
    }
    function publicGetName() {
        privateFunction();
    }
    // Reveal public pointers to 
    // private functions and properties
    return {
        setName: publicSetName,
        greeting: publicVar,
        getName: publicGetName
    };
}();

myRevealingModule.setName( "Paul Kinlan" );



/* 优点：
这个模式是我们脚本的语法更加一致。
同样在模块的最后关于那些函数和变量可以被公共访问也变得更加清晰，增强了可读性。
*/

/* 缺点：
这个模式的一个缺点是如果私有函数需要使用公有函数，那么这个公有函数在需要打补丁的时候就不能被重载。
因为私有函数仍然使用的是私有的实现，并且这个模式不能用于公有成员，只用于函数。

公有成员使用私有成员也遵循上面不能打补丁的规则。

因为上面的原因，使用暴露式模块模式创建的模块相对于原始的模块模式更容易出问题，
因此在使用的时候需要小心。
*/