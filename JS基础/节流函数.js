/**
 * [throttle 节流函数：密集事件间隔时间小于 interval，间隔 interval 响应一次]
 * @param  {Function} fn       [要执行的回调函数]
 * @param  {[type]}   interval [密集事件间隔时间]
 * @return {[type]}            [description]
 */
function throttle(fn, interval) {
    var last;
    var timer;
    var interval = interval || 200;
    return function() {
        var _this = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            // 没超过 interval 间隔时间不执行
            clearTimeout(timer);
            // 保证最后一次事件触发后能够调用
            timer = setTimeout(function(){
                last = now;
                fn.apply(_this, args);
            }, interval);
        } else {
            // 超过 interval 间隔时间执行一次
            last = now;
            fn.apply(_this, args);
        }
    }
}

dom.addEventListener('scroll', throttle(function() {
}));
