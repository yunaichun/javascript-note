/**
 * [tenToTwo 十进制转换为二进制]
 * @param  {[Number/String]} data [十进制数据]
 * @return {[String]}             [返回十进制数据对应的二进制数据]
 */
function tenToTwo(data) {
    // 被除数
    let a = parseInt(data);
    // 商
    let c = '';
    // 余数
    let d = '';
    // 返回结果
    let res = '';
    // 直到被除数为 0 为止
    while(a) {
        c = Math.floor(a / 2);
        d = Math.ceil(a % 2);
        a = c;
        res = res + d;
    }
    return res.split('').reverse().join('');
}
console.log(tenToTwo(10));


/**
 * [twoToTen 二进制转换为十进制]
 * @param  {[Number/String]} data [二进制数据]
 * @return {[Number]}             [返回二进制数据对应的十进制数据]
 */
function twoToTen(data) {
    let str = data.toString();
    // 返回结果
    let res = 0;
    for (let i = 0, len = str.toString().length; i < len; i++) {
       res = res + str[i] * Math.pow(2, len - i - 1); 
    }
    return res;
}
console.log(twoToTen(1010));


/*原码、补码、反码概念：https://www.zhihu.com/question/20159860?sort=created
1、原码：二进制表示。【左边第一位为符号位，负数符号位 1，正数符号位为 0 】
   
   存在问题：正负相加不等于0。如：0001 (1) + 1001 (-1) = 1010 (-2)

2、反码：用来处理负数的！【符号位置不变，其余位置相反】
   
   解决问题：正负相加等于0。  如：0001 (1) + 1110 (-1) = 1111 (-0)

   存在问题：存在 +0 (0000) 、-0 (1111)

3、补码：用来处理负数的！【在反码位置上补1（丢掉最高位）】

   解决问题：不存在 +0 (0000) 、-0 (1111)。0001 (1) + 1110 (-1) = 10000 = 0000 (+0)

总结：正数的原、反、补码都一样！
      0 的原码：+0 (0000)、-0（1000）
      0 的反码：+0 (0000) 、-0 (1111)
      0 的补码：+0 (0000) 、-0 (1111 + 1 = 0000)
*/
