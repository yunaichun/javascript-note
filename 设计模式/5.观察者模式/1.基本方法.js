var pubsub = {};
(function (q) {

    var topics = {}, // 回调函数存放的数组：topics = { topic: [{ token: token, func: func }] }
        subUid = -1;
    // 发布方法
    q.publish = function (topic, args) {
        //订阅的事件中不存在发布的事件的话，直接返回false
        if (!topics[topic]) {
            return false;
        }
        setTimeout(function () {
            var subscribers = topics[topic],
                len = subscribers ? subscribers.length : 0;
            //执行此topic数组中所有的函数func
            while (len--) {
                subscribers[len].func(topic, args);
            }
        }, 0);

        return true;

    };
    //订阅方法
    q.subscribe = function (topic, func) {
        //初始化订阅对象
        if (!topics[topic]) {
            topics[topic] = [];
        }
        //订阅对象topic：自增的token + 传入的函数【是一个数组对象】
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
    //退订方法
    q.unsubscribe = function (token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    };
} (pubsub));

//来，订阅一个
//将订阅赋值给一个变量，以便退订
var testSubscription = pubsub.subscribe('example1', function (topics, data) {
    console.log(topics + ": " + data);
});
pubsub.subscribe('example1', function (topics, data) {
    console.log(topics + "这是第二个回调函数: " + data);
});

//发布通知
pubsub.publish('example1', 'hello world!');
pubsub.publish('example1', ['test', 'a', 'b', 'c']);
pubsub.publish('example1', [{ 'color': 'blue' }, { 'text': 'hello'}]);


//退订
setTimeout(function () {
    pubsub.unsubscribe(testSubscription);
}, 0);
//再发布一次，验证一下是否还能够输出信息
pubsub.publish('example1', 'hello again! (this will fail)');