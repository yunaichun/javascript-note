// Application.js
const http = require('http');

// 对象属性的 get 和 set 方法
let request = {
    get url () {
        return this.req.url;
    }
};
let response = {
    get body () {
        return this._body;
    },
    set body (val) {
        this._body = val;
    }
};
let context = {
    get url () {
        return this.request.url;
    },
    get body () {
        return this.response.body;
    },
    set body (val) {
        this.response.body = val;
    }
};

class Application {
    constructor () {
        // context 对象
        this.context = context;
        // request 对象
        this.request = request;
        // response 对象
        this.response = response;
        // 中间件
        this.middleware = [];
    }
    /*封装 HTTP 模块*/
    listen(...args) {
        const server = http.createServer(async (req, res) => {
            // 封装 ctx 对象
            let ctx = this.createCtx(req, res);
            // 中间件执行机制
            const middlewaresFn = this.compose(this.middleware);
            // 依次执行中间件
            await middlewaresFn(ctx);
            ctx.res.end(ctx.body);
        });
        server.listen(...args);
    }
    /*封装 ctx 对象*/
    createCtx(req, res) {
        let ctx = Object.create(this.context);
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);
        // 将 req 绑定到 ctx.req 上
        ctx.req = ctx.request.req = req;
        // 将 res 绑定到 ctx.res 上
        ctx.res = ctx.response.res = res;
        return ctx;
    }
    /*收集中间件*/
    use (callback) {
        this.middleware.push(callback);
    }
    /*中间件执行机制*/
    compose (middleware) {
        return function (context) {
            // 从第一个中间件开始依次执行
            return dispatch (0);
            function dispatch (i) {
                let fn = middleware[i];
                if (!fn) {
                    return Promise.resolve();
                }
                // 中间件 fn 的参数 context 为封装的 ctx 对象, 参数 next 为下一个中间件【函数】
                return Promise.resolve(fn(context, function next () {
                    return dispatch(i + 1);
                }));
            }
        }
    }
}

// 测试
const app = new Application();
function delay () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve ();
        }, 2000);
    });
}
app.use(async (ctx, next) => {
    ctx.body = '1';
    await next ();
    ctx.body += '2';
});
app.use(async (ctx, next) => {
    ctx.body += '3';
    await delay ();
    await next ();
    ctx.body += '4';
});
app.use(async (ctx, next) => {
    ctx.body += '5';
});
app.listen(3000, () => {
    console.log('server running on port 3000');
});
