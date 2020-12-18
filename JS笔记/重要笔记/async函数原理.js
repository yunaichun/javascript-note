//== 一、async 是什么
// 1、内置执行器。
// 2、更好的语义。
// 3、更广的适用性。
// 4、返回值是 Promise。
// == async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
// == 所有的 async 函数都可以写成上面的第二种形式，其中的 spawn 函数就是自动执行器。
async function fn(args) {
// ...
}
// == 等价于
function fn(args) {
    return spawn(function* () {
        // ...
    });
}


// 二、spawn 函数实现
function spawn(genFuc) {
    return new Promise(function(resolve, reject) {
        function run(genFuc) {
            let gen = genFuc();
            function thenback(data) {
                let result = gen.next(data);
                
                if (result.done) return result.value;
                
                Promise.resolve(result.value)
                .then(function(value) {
                    thenback(value);
                }, function(reason) {
                    gen.throw(reason);
                });
            }
            thenback();
        }
        run(genFuc);
    });
}
