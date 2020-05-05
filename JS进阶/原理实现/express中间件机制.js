/**
 * 仿照express实现中间件的功能
 */
let http = require('http');

function express() {
    let middleware = [];
    let app = function(req, res) {
        let i = 0;
        function next() {
            let task = middleware[i++];
            if (!task) return;
            // == 函数内部调用函数
            // == next 为第一个中间件，里面传入第二个中间件
            task(req, res, next);
        }
        next();
    };
    app.use = function(callback) {
        middleware.push(callback);
    }
    return app;
}


// 测试
let app = express();
function middlewareA(req, res, next) {
    console.log('middlewareA before next()');
    next();
    console.log('middlewareA after next()');
}
function middlewareB(req, res, next) {
    console.log('middlewareB before next()');
    next();
    console.log('middlewareB after next()');
}
function middlewareC(req, res, next) {
    console.log('middlewareC before next()');
    next();
    console.log('middlewareC after next()');
}
app.use(middlewareA);
app.use(middlewareB);
app.use(middlewareC);

http.createServer(app).listen('3000', function () {
    console.log('listening 3000....');
});