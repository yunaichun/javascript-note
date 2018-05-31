//通用代码
var observer = {
    //订阅[存入回调函数]
    addSubscriber: function (callback) {
        this.subscribers[this.subscribers.length] = callback;
    },
    //退订[移除回调函数]
    removeSubscriber: function (callback) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === callback) {
                delete (this.subscribers[i]);
            }
        }
    },
    //发布[执行回调函数，传入参数what]
    publish: function (what) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === 'function') {
                this.subscribers[i](what);
            }
        }
    },
    // 将对象o具有观察者功能[使多个对象具有观察者功能]
    make: function (o) { 
        for (var i in this) {
            o[i] = this[i];
            o.subscribers = [];
        }
    }
};


/**
 * [订阅2个对象blogger和user，使用observer.make方法将这2个对象具有观察者功能]
 * @type {Object}
 */
var blogger = {
    recommend: function (id) {
        var msg = 'dudu 推荐了的帖子:' + id;
        this.publish(msg);
    }
};
var user = {
    vote: function (id) {
        var msg = '有人投票了!ID=' + id;
        this.publish(msg);
    }
};
observer.make(blogger);
observer.make(user);



/**
 * [开始订阅]
 * @type {Object}
 */
var tom = {
    read: function (what) {
        console.log('Tom看到了如下信息：' + what)
    }
};
var mm = {
    show: function (what) {
        console.log('mm看到了如下信息：' + what)
    }
};
// 订阅
blogger.addSubscriber(tom.read);
blogger.addSubscriber(mm.show);
blogger.recommend(123); //调用发布

//退订
blogger.removeSubscriber(mm.show);
blogger.recommend(456); //调用发布

//另外一个对象的订阅
user.addSubscriber(mm.show);
user.vote(789); //调用发布