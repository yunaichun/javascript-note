/*基本法则：根据函数类型和对象字面量
        1、this在对象方法中调用指向的是这个方法的对象
        2、this在普通函数中指向的是global（等同于浏览器中的window）
        3、this在构造函数中指向的是实例对象
*/
//1、对象字面量：指向指向这个对象字面量
var pet1={
    words:'...',
    speak:function(){
        console.log(this.words);//...
        console.log(this);//Object
        console.log(this===pet1);//true
    }
};
pet1.speak();
//2、普通函数：this指向window
function pet2(words){
   this.words=words;
   console.log(this.words);//...
   console.log(this);//window
   console.log(this===window);//true(非浏览器指向global)
}
pet2('...');
//3、构造函数：this指代实例对象
function pet3(words){
   this.words=words;
   this.speak=function(){
       console.log(this.words);//...
       console.log(this);//pet3{}
   };
}
var cat= new pet3('...');
cat.speak();



/*深度法则：
        1、未被上一级调用，this指向window（global）
        2、被上一级对象调用，this指向上一级对象
        3、层级对象嵌套的情况，this始终指向上一级调用对象
        4、this永远指向最后调用它的对象
*/
//1、未被上一级调用【相当于普通函数中this调用】
function a(){
    var user = "追梦子";
    console.log(this.user); //undefined
    console.log(this);　　//Window
    console.log(this===window);//true(非浏览器指向global)
}
a();
window.a();

//2、被上一级对象调用【相当于对象字面量中国this调用】
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
        console.log(this);//Object
        console.log(this===o);//true
    }
};
o.fn();
window.o.fn();//this始终指向上一级调用对象

//3、this始终指向上一级调用对象
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //12
            console.log(this);//Object
            console.log(this===o.b);//true
        }
    }
};
o.b.fn();

//4、this永远指向最后调用它的对象
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //window
            console.log(this===window); //true
        }
    }
};
var j = o.b.fn;
j();



/*构造函数中有return时this的指向：
        1、return的是五种简单数据类型：String，Number，Boolean，Null，Undefined。
           这种情况下，忽视return值，依然返回this对象。
        2、return的是Object：这种情况下，不再返回this对象，而是返回return语句的返回值。
*/
//return基本类型的情况
function fn(){  
    this.user = '追梦子';  
    return undefined;//return:undefined
}
var a = new fn();  
console.log(a.user); //追梦子
console.log(a); //fn
console.log(a instanceof fn); //true

function fn(){  
    this.user = '追梦子';  
    return null;
}
var a = new fn();
console.log(a.user); //追梦子  
console.log(a); //fn
console.log(a instanceof fn); //true


//return不是基本类型
function fn(){  
    this.user = '追梦子'; 
    return {};  //return :Object
}
var a = new fn();  
console.log(a.user); //undefined
console.log(a); //Object
console.log(a instanceof Object); //true

function fn(){  
    this.user = '追梦子';  
    return function(){};//return:function
}
var a = new fn();  
console.log(a.user); //undefined
console.log(a); //function(){}
console.log(a instanceof Object); //true



/*普通函数中有return时this的指向：
        1、return的是基本类型或者表达式：就是这个值
        2、return的是function：就是闭包，变成全局，this的作用域已经是window
        3、return的是Object：Object中如有function，也是闭包，
           this的作用域是返回的这个Object，只不过变量的值一直保存在Object中，而不是window中。
综上可知：闭包不是在构造函数中返回，而是在普通函数和对象字面量中返回function或者带function的Object
*/
//return的是function
var name = "window作用域";   
var object = {   
　　name : "对象作用域",   
　　getNameFunc : function(){   
　　　　return function(){ 
            console.log(this);//window
            console.log(this===window);//true(非浏览器指向global)
　　　　　　return this.name;   
　　　  };   
　　}   
};   
console.log(typeof object.getNameFunc()); //function
console.log(object.getNameFunc() instanceof Object); //true
console.log(object.getNameFunc()()); //"window作用域"

//return的是Object
function create_counter(initial){
    var x=initial||0;
    console.log("闭包之外x变量的值"+x);//只有在初引用的时候才在
    return {
        //此函数可以访问create_counter内部变量inintial（形参），将这个函数返回的话，creater_counter外部就可以访问create_counter内部的变量inintial了。
        //由于initial变为全局变量了，所以保存状态，所以每次传递值(实参)进去都会保存下来。
        inc:function(){
        	console.log("x变量的值一直保存在这个对象中"+x);//这个值一直保存在这个对象作用域中不被销毁
        	console.log(this);//Object{}
            console.log(this instanceof Object);//true
            x+=1;
            return x;
        }
    };
}
var c1=create_counter();
console.log(typeof c1);//object
console.log(c1 instanceof Object);//true

console.log(c1.inc());//1
console.log(c1.inc());//2
console.log(c1.inc());//3
console.log(x);//由于x变量的值是在return的全局Object中，但不是在window直接作用域中，所以访问不到

var c2=create_counter(10);
console.log(c2.inc());//11
console.log(c2.inc());//12
console.log(c2.inc());//13




/**
 * 含有 箭头函数 的 this 指向
 */
setTimeout(function() {
    console.log(this); // window
});

setTimeout(() => {
    console.log(this); // window
});

var o = {
    a: {
        b: function() {
            setTimeout(() => {
                console.log(this); // o.a: { b: function() {} }
            });
        }
    }
};
o.a.b();
