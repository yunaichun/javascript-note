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
        // 传入的middleware必须是一个数组
        if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
        // 传入的middleware的每一个元素都必须是函数
        for (const fn of middleware) {
            if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
        }
        return function (context) {
            // 维护一个 index 的闭包
            let index = -1;
            // 从第一个中间件开始依次执行
            return dispatch (0);
            function dispatch (i) {
                // 一个中间件存在多次 next 调用
                if (i <= index) return Promise.reject(new Error('next() called multiple times'));
                // 存下当前的索引
                index = i;
                let fn = middleware[i]
                // 以下两行是处理最后一个中间件还有 next 的情况
                if (i === middleware.length) fn = next;
                if (!fn) return Promise.resolve();
                try {
                    // 中间件 fn 的参数 context 为封装的 ctx 对象, 参数 next 为下一个中间件【函数】
                    return Promise.resolve(fn(context, function next () {
                      return dispatch(i + 1);
                    }))
                } catch (err) {
                    return Promise.reject(err);
                }
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
