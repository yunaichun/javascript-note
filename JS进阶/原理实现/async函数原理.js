async function fn(args) {
	// ...
}
// 等价于
function fn(args) {
	return spawn(function* () {
		// ...
	});
}

// spawn 函数的实现:Generator自动执行器
function spawn(genCreator) {
	return new Promise(function(resolve, reject) {
		let gen = genCreator();
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
	});
}