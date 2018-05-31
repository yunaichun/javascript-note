/**
 * [
 *     可以看到，他的订阅和退订使用的是字符串名称，而不是回调函数名称，
 *     所以即便传入的是匿名函数，我们也是可以退订的
 * ]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
(function ($) {
    var o = $({});
    //订阅事件[存入o函数]
    $.subscribe = function () {
        o.on.apply(o, arguments);
    };
    //取消订阅
    $.unsubscribe = function () {
        o.off.apply(o, arguments);
    };
    //发布事件[执行o函数]
    $.publish = function () {
        o.trigger.apply(o, arguments);
    };
} (jQuery));



//回调函数
function handle(e, a, b, c) {
    // `e`是事件对象，不需要关注
    console.log(a + b + c);
};

//订阅
$.subscribe("/some/topic", handle);
//发布
$.publish("/some/topic", ["a", "b", "c"]); // 输出abc
        

$.unsubscribe("/some/topic", handle); // 退订

//订阅
$.subscribe("/some/topic", function (e, a, b, c) {
    console.log(a + b + c);
});

$.publish("/some/topic", ["a", "b", "c"]); // 输出abc

//退订（退订使用的是/some/topic名称，而不是回调函数哦，和版本一的例子不一样
$.unsubscribe("/some/topic"); 