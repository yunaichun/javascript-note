// 先声明美女对象
var girl = function (name) {
    this.name = name;
};

// 这是dudu
var dudu = function (girl) {
    this.girl = girl;
    this.sendGift = function (gift) {
        alert("Hi " + girl.name + ", dudu送你一个礼物：" + gift);
    }
};

// 大叔是代理
var proxyTom = function (girl) {
    this.girl = girl;
    this.sendGift = function (gift) {
        (new dudu(girl)).sendGift(gift); // 替dudu送花咯
    }
};


var proxy = new proxyTom(new girl('酸奶小妹'));
proxy.sendGift("999朵玫瑰");