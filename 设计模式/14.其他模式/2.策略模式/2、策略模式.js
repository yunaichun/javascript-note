/*
首先如果增加需求的话，我们还要再次修改这段代码以增加逻辑，
而且在进行单元测试的时候也会越来越复杂
*/
validator = {
    validate: function (value, type) {
        switch (type) {
            case 'isNonEmpty ':
                {
                    return true; // NonEmpty 验证结果
                }
            case 'isNumber ':
                {
                    return true; // Number 验证结果
                    break;
                }
            case 'isAlphaNum ':
                {
                    return true; // AlphaNum 验证结果
                }
            default:
                {
                    return true;
                }
        }
    }
};
alert(validator.validate("123", "isNonEmpty"));









/**第一步：
 * 那如何来避免上述代码中的问题呢？
 * 根据策略模式，我们可以将相同的工作代码单独封装成不同的类，
 * 然后通过统一的策略处理类来处理，OK，我们先来定义策略处理类，代码如下：
 */
var validator = {
    // 所有可以的验证规则处理类存放的地方，后面会单独定义--------[验证规则validate + 不通过instructions]
    types: {},
    // 验证类型所对应的错误消息
    messages: [],
    // 当然需要使用的验证类型------------------------------------[通过data获取到config中指定data[i]的验证types类型]
    config: {}, 
    // 暴露的公开验证方法
    // 传入的参数是 key => value对
    validate: function (data) {
        var i, msg, type, checker, result_ok;
        // 清空所有的错误信息
        this.messages = [];
        for (i in data) {
            if (data.hasOwnProperty(i)) {
                type = this.config[i];  // 根据key查询是否有存在的验证规则
                checker = this.types[type]; // 获取验证规则的验证类
                if (!type) {
                    continue; // 如果验证规则不存在，则不处理
                }
                if (!checker) { // 如果验证规则类不存在，抛出异常
                    throw {
                        name: "ValidationError",
                        message: "No handler to validate type " + type
                    };
                }
                result_ok = checker.validate(data[i]); // 使用查到到的单个验证类进行验证
                if (!result_ok) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions;
                    this.messages.push(msg);
                }
            }
        }
        return this.hasErrors();
    },
    // helper
    hasErrors: function () {
        return this.messages.length !== 0;
    }
};

/**第二步：
 * 然后剩下的工作，就是定义types里存放的各种验证类了
 * 我们这里只举几个例子：
 */
// 验证给定的值是否不为空
validator.types.isNonEmpty = {
    validate: function (value) {
        return value !== "";
    },
    instructions: "传入的值不能为空"
};

// 验证给定的值是否是数字
validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(value);
    },
    instructions: "传入的值只能是合法的数字，例如：1, 3.14 or 2010"
};

// 验证给定的值是否只是字母或数字
validator.types.isAlphaNum = {
    validate: function (value) {
        return !/[^a-z0-9]/i.test(value);
    },
    instructions: "传入的值只能保护字母和数字，不能包含特殊字符"
};


/**第三步：
 * 使用的时候，我们首先要定义需要验证的数据集合，
 * 然后还需要定义每种数据需要验证的规则类型，代码如下：
 */
var data = {
    first_name: "Tom",
    last_name: "Xu",
    age: "unknown",
    username: "TomXu"
};

validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
};


/**第四步：
 * 最后，获取验证结果的代码就简单了：
 */
validator.validate(data);
if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"));
}