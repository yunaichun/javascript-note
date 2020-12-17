async function fn(args) {
	// ...
}
// 等价于
function fn(args) {
	return spawn(function* () {
		// ...
	});
}

/**
 * [spawn 自动管理流程：即将自动遍历的结果转换为 Promise，然后利用 Promise 的 then 回调自动执行 generator 函数]
 * @param  {[type]} genFuc [generator 函数]
 * @return {[type]}        [description]
 */
function spawn(genFuc) {
	return new Promise(function(resolve, reject) {
		/*初始写法：
			let gen = genFuc();
			function next(fuc) {
				try {
					let result = fuc();
				} catch(e) {
					reject(e);
				}
				let result = fuc();
				if (result.done) { return result.value; }
				// 将值转换成 Promise 对象
				Promise.resolve(result.value).then(function(value) {
					next(function() {
						return gen.next(value);
					});
				}, function(reason) {
					next(function() {
						return gen.throw(reason);
					});
				});
			}
			// 初始调用
			next(function() { return gen.next(); });
		*/
		function run(genFuc) {
			let gen = genFuc();
			function thenback(data) {
				let result = gen.next(data); // data 是设置 Generator 内部 yield 的值
				if (result.done) { return result.value; }
				/*将此处的 value 转换为 Promise，与 generator 的 Promise 管理流程是一样的，只不过那时候默认 yield 后面的值都是 Promise */
				Promise.resolve(result.value).then(function(value) { // 此处 value 为 Promise 对象，值为 result.value
					thenback(value);
				}, function(reason) {
					gen.throw(reason);
				});
			}
			thenback();
		}
		run(genFuc);
	});
}

// 测试
function* dycFib() {
    let prev = 1
    let curr = 1
    while (prev < 20) {
        // 每次遍历返回的是yield后面的值：即prev的值
        yield prev;
        console.log(prev); // 1 1 2 3 5 8 13
        [prev, curr] = [curr, prev + curr];
    }
}
spawn(dycFib);
