// == Application.js
const http = require('http');

// == 对象属性的 get 和 set 方法
let request = {
    get url() {
        return this.req.url;
    }
};
let response = {
    get body() {
        return this._body;
    },
    set body(val) {
        this._body = val;
    }
};
let context = {
    get url() {
        return this.request.url;
    },
    get body() {
        return this.response.body;
    },
    set body(val) {
        this.response.body = val;
    }
};

class Application {
    constructor() {
        this.context = context;
        this.request = request;
        this.response = response;
        this.middleware = [];
    }

    // == 封装 HTTP 模块
    listen(...args) {
        const server = http.createServer(async (req, res) => {
            let ctx = this.createCtx(req, res);
            const middlewaresFn = this.compose(this.middleware);
            await middlewaresFn(ctx);
            ctx.res.end(ctx.body);
        });
        server.listen(...args);
    }

    // == 封装 ctx 对象
    createCtx(req, res) {
        let ctx = Object.create(this.context);
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }
    
    // == 收集中间件
    use(callback) {
        this.middleware.push(callback);
    }
    
    // == 中间件执行机制
    compose(middleware) {
        if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
        for (const fn of middleware) {
            if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
        }
        return function (context) {
            let index = -1;
            function dispatch(i) {
                if (i <= index) return Promise.reject(new Error('next() called multiple times'));
                index = i;
                let fn = middleware[i]
                if (i === middleware.length) fn = next;
                if (!fn) return Promise.resolve();
                try {
                    return Promise.resolve(
                        // == 函数内部调用自身函数: 里面传入第二个中间件
                        fn(context, function next() {
                            return dispatch(i + 1);
                        })
                      );
                } catch (err) {
                    return Promise.reject(err);
                }
            }
            // == 从第一个中间件开始执行
            return dispatch(0);
        }
    }
}

// 测试
const app = new Application();

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

app.use(async (ctx, next) => {
    ctx.body = '1';
    await next();
    ctx.body += '2';
});

app.use(async (ctx, next) => {
    ctx.body += '3';
    await delay();
    await next();
    ctx.body += '4';
});

app.use(async (ctx, next) => {
    ctx.body += '5';
});

app.listen(3000, () => {
    console.log('server running on port 3000');
});
