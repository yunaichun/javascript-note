/**
 * 一、什么是deferred对象？
 */
/* 
开发网站的过程中，我们经常遇到某些耗时很长的javascript操作。
其中，既有异步的操作（比如ajax读取服务器数据），
也有同步的操作（比如遍历一个大型数组），它们都不是立即能得到结果的。

通常的做法是，为它们指定回调函数（callback）。
即事先规定，一旦它们运行结束，应该调用哪些函数。
但是，在回调函数方面，jQuery的功能非常弱。
为了改变这一点，jQuery开发团队就设计了deferred对象。
简单说，deferred对象就是jQuery的回调函数解决方案。
在英语中，defer的意思是"延迟"，所以deferred对象的含义就是"延迟"到未来某个点再执行。
*/



/**
 * 二、ajax操作的链式写法
 */
$.ajax({
　　　　url: "test.html",
　　　　success: function(){
　　　　　　alert("哈哈，成功了！");
　　　　},
　　　　error:function(){
　　　　　　alert("出错啦！");
　　　　}
});
/* 
$.ajax()接受一个对象参数，这个对象包含两个方法：
success方法指定操作成功后的回调函数，
error方法指定操作失败后的回调函数。
$.ajax()操作完成后，
如果使用的是低于1.5.0版本的jQuery，返回的是XHR对象，你没法进行链式操作；
如果高于1.5.0版本，返回的是deferred对象，可以进行链式操作。
done()相当于success方法，fail()相当于error方法。
采用链式写法以后，代码的可读性大大提高。
*/
$.ajax("test.html")
.done(function(){ alert("哈哈，成功了！"); })
.fail(function(){ alert("出错啦！"); });



/**
 * 三、指定同一操作的多个回调函数
 */
/*deferred对象的一大好处，就是它允许你自由添加多个回调函数。*/
$.ajax("test.html")
.done(function(){ alert("哈哈，成功了！");} )
.fail(function(){ alert("出错啦！"); } )
.done(function(){ alert("第二个回调函数！");} );



/**
 * 四、为多个操作指定回调函数
 */
/* 
deferred对象的另一大好处，就是它允许你为多个事件指定一个回调函数，
这是传统写法做不到的。

先执行两个操作$.ajax("test1.html")和$.ajax("test2.html")，
如果都成功了，就运行done()指定的回调函数；
如果有一个失败或都失败了，就执行fail()指定的回调函数。
*/
$.when($.ajax("test1.html"), $.ajax("test2.html"))
.done(function(){ alert("哈哈，成功了！"); })
.fail(function(){ alert("出错啦！"); });



/**
 * 五、普通操作的回调函数接口（上）
 */
/* 
deferred对象的最大优点，
就是它把这一套回调函数接口，从ajax操作扩展到了所有操作。
也就是说，任何一个操作----
不管是ajax操作还是本地操作，也不管是异步操作还是同步操作----
都可以使用deferred对象的各种方法，指定回调函数。
*/
var wait = function(){
　　var tasks = function(){
　　　　alert("执行完毕！");
　　};
　　setTimeout(tasks,5000);
};
$.when(wait())
.done(function(){ alert("哈哈，成功了！"); })
.fail(function(){ alert("出错啦！"); });
/* 
但是，这样写的话，
done()方法会立即执行，起不到回调函数的作用。
原因在于$.when()的参数只能是deferred对象，所以必须对wait()进行改写：
*/
var dtd = $.Deferred(); // 新建一个deferred对象
var wait = function(dtd){
　　var tasks = function(){
　　　　alert("执行完毕！");
        /* 
        dtd.resolve()的意思是，
        将dtd对象的执行状态从"未完成"改为"已完成"，
        从而触发done()方法。
        */
　　　　dtd.resolve(); // 改变deferred对象的执行状态
　　};
　　setTimeout(tasks,5000);
　　return dtd;
};
$.when(wait(dtd))//wait()函数运行完，就会自动运行done()方法指定的回调函数。
.done(function(){ alert("哈哈，成功了！"); })
.fail(function(){ alert("出错啦！"); });



/**
 * 六、deferred.resolve()方法和deferred.reject()方法
 */
/* 
jQuery规定，deferred对象有三种执行状态----未完成，已完成和已失败。
如果执行状态是"已完成"（resolved）,deferred对象立刻调用done()方法指定的回调函数；
如果执行状态是"已失败"，调用fail()方法指定的回调函数；
如果执行状态是"未完成"，则继续等待，或者调用progress()方法指定的回调函数（jQuery1.7版本添加）。
*/
var dtd = $.Deferred(); // 新建一个Deferred对象
var wait = function(dtd){
　　var tasks = function(){
　　　　alert("执行完毕！");
　　　　dtd.reject(); // 改变Deferred对象的执行状态
　　};
　　setTimeout(tasks,5000);
　　return dtd;
};
$.when(wait(dtd))
.done(function(){ alert("哈哈，成功了！"); })
.fail(function(){ alert("出错啦！"); });



/**
 * 七、deferred.promise()方法
 */
var dtd = $.Deferred(); // 新建一个Deferred对象
var wait = function(dtd){
　　var tasks = function(){
　　　　alert("执行完毕！");
　　　　dtd.resolve(); // 改变Deferred对象的执行状态
　　};
　　setTimeout(tasks,5000);
　　return dtd;
};
$.when(wait(dtd))
.done(function(){ alert("哈哈，成功了！"); })
.fail(function(){ alert("出错啦！"); });
/* 
dtd.resolve()手动从外部改变状态 
这就改变了dtd对象的执行状态，
因此导致done()方法立刻执行，跳出"哈哈，成功了！"的提示框，
等5秒之后再跳出"执行完毕！"的提示框。
*/
dtd.resolve();

/* 
为了避免这种情况：
jQuery提供了deferred.promise()方法。
它的作用是：
在原来的deferred对象上返回另一个deferred对象，
后者只开放与改变执行状态无关的方法（比如done()方法和fail()方法），
屏蔽与改变执行状态有关的方法（比如resolve()方法和reject()方法），
从而使得执行状态不能被改变。
*/
var dtd = $.Deferred(); // 新建一个Deferred对象
var wait = function(dtd){
　　var tasks = function(){
　　　　alert("执行完毕！");
　　　　dtd.resolve(); // 改变Deferred对象的执行状态
　　};
　　setTimeout(tasks,5000);
　　return dtd.promise(); // 返回promise对象
};
var d = wait(dtd); // 新建一个d对象，改为对这个对象进行操作
$.when(d)
.done(function(){ alert("哈哈，成功了！"); })
.fail(function(){ alert("出错啦！"); });
//外部手动改变不了这个状态
d.resolve(); // 此时，这个语句是无效的

/* 
不过，更好的写法是allenm所指出的，
将dtd对象变成wait(）函数的内部对象。
*/
var wait = function(dtd){
　　var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象
　　var tasks = function(){
　　　　alert("执行完毕！");
　　　　dtd.resolve(); // 改变Deferred对象的执行状态
　　};
    setTimeout(tasks,5000);
　　return dtd.promise(); // 返回promise对象
};
$.when(wait())
.done(function(){ alert("哈哈，成功了！"); })
.fail(function(){ alert("出错啦！"); });



/**
 * 八、普通操作的回调函数接口（中）
 */
/* 
另一种防止执行状态被外部改变的方法，
是使用deferred对象的建构函数$.Deferred()。
这时，wait函数还是保持不变，我们直接把它传入$.Deferred()：
*/
var wait = function(dtd){
　　var tasks = function(){
　　　　alert("执行完毕！");
　　　　dtd.resolve(); // 改变Deferred对象的执行状态
　　};
　　setTimeout(tasks,5000);
　　return dtd.promise();
};
$.Deferred(wait)
.done(function(){ alert("哈哈，成功了！"); })
.fail(function(){ alert("出错啦！"); });
/* 
jQuery规定，$.Deferred()可以接受一个函数名（注意，是函数名）作为参数，
$.Deferred()所生成的deferred对象将作为这个函数的默认参数。
*/



/**
 * 九、普通操作的回调函数接口（下）
 */
var dtd = $.Deferred(); // 生成Deferred对象
var wait = function(dtd){
　　var tasks = function(){
　　　　alert("执行完毕！");
　　　　dtd.resolve(); // 改变Deferred对象的执行状态
　　};
　　setTimeout(tasks,5000);
};
//直接在wait对象上部署deferred接口。
dtd.promise(wait);
wait
.done(function(){ alert("哈哈，成功了！"); })
.fail(function(){ alert("出错啦！"); });
//执行wait函数
wait(dtd);



/**
 * 十、小结：deferred对象的方法
 */
/* 
(1)$.Deferred() 
   生成一个deferred对象。
(2)deferred.done() 
   指定操作成功时的回调函数(resolve状态)
(3)deferred.fail() 
   指定操作失败时的回调函数(reject状态)
(4)deferred.promise()
   没有参数时，返回一个新的deferred对象，该对象的运行状态无法被改变；
   接受参数时，作用为在参数对象上部署deferred接口。
(5)deferred.resolve() 
   手动改变deferred对象的运行状态为"已完成"，
   从而立即触发done()方法。
(6)deferred.reject() 
   这个方法与deferred.resolve()正好相反，
   调用后将deferred对象的运行状态变为"已失败"，
   从而立即触发fail()方法。
(7)$.when() 
   为多个操作指定回调函数。
(8)deferred.then()
    可以把done()和fail()合在一起写，这就是then()方法。
　　$.when($.ajax( "/main.php" ))
　　.then(successFunc, failureFunc );
    如果then()有两个参数，那么第一个参数是done()方法的回调函数，第二个参数是fail()方法的回调方法。
    如果then()只有一个参数，那么等同于done()。
(9)deferred.always()
    这个方法也是用来指定回调函数的，
    它的作用是，不管调用的是deferred.resolve()还是deferred.reject()，最后总是执行。
　　$.ajax( "test.html" )
　　.always( function() { alert("已执行！");} );
*/