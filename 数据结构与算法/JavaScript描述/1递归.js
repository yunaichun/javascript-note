function fal(num){
	if (num==1) {
		// statement
		return num;
	} else {
		// statement
		return num*arguments.callee(num-1);
	}
}
console.log(fal(5));