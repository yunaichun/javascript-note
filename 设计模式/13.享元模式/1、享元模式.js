/**
 * [Book 未优化的模式]
 * @param {[type]} id             [description]
 * @param {[type]} title          [description]
 * @param {[type]} author         [description]
 * @param {[type]} genre          [description]
 * @param {[type]} pageCount      [description]
 * @param {[type]} publisherID    [description]
 * @param {[type]} ISBN           [description]
 * @param {[type]} checkoutDate   [description]
 * @param {[type]} checkoutMember [description]
 * @param {[type]} dueReturnDate  [description]
 * @param {[type]} availability   [description]
 */
var Book = function( id, title, author, genre, pageCount,publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate,availability ){
   this.id = id;
   this.title = title;
   this.author = author;
   this.genre = genre;
   this.pageCount = pageCount;
   this.publisherID = publisherID;
   this.ISBN = ISBN;
   this.checkoutDate = checkoutDate;
   this.checkoutMember = checkoutMember;
   this.dueReturnDate = dueReturnDate;
   this.availability = availability;
};
Book.prototype = {
   getTitle:function(){
       return this.title;
   },
   getAuthor: function(){
       return this.author;
   },
   getISBN: function(){
       return this.ISBN;
   },
/*其它get方法在这里就不显示了*/

// 更新借出状态
updateCheckoutStatus: function(bookID, newStatus, checkoutDate,checkoutMember, newReturnDate){
   this.id  = bookID;
   this.availability = newStatus;
   this.checkoutDate = checkoutDate;
   this.checkoutMember = checkoutMember;
   this.dueReturnDate = newReturnDate;
},
//续借
extendCheckoutPeriod: function(bookID, newReturnDate){
    this.id =  bookID;
    this.dueReturnDate = newReturnDate;
},
//是否到期
isPastDue: function(bookID){
   var currentDate = new Date();
   return currentDate.getTime() > Date.parse(this.dueReturnDate);
 }
};









/**
 * [Book 享元模式优化代码]
 * @param {[type]} title       [description]
 * @param {[type]} author      [description]
 * @param {[type]} genre       [description]
 * @param {[type]} pageCount   [description]
 * @param {[type]} publisherID [description]
 * @param {[type]} ISBN        [description]
 */
var Book = function(title, author, genre, pageCount, publisherID, ISBN){
   this.title = title;
   this.author = author;
   this.genre = genre;
   this.pageCount = pageCount;
   this.publisherID = publisherID;
   this.ISBN = ISBN;
};


/**
 * [定义基本工厂：Book工厂 单例]
 * @param  {Object} ){                var existingBooks [description]
 * @return {[type]}     [description]
 */
var BookFactory = (function(){
   var existingBooks = {};
   return{
       createBook: function(title, author, genre,pageCount,publisherID,ISBN){
       /*查找之前是否创建*/
           var existingBook = existingBooks[ISBN];
           if(existingBook){
                   return existingBook;
               }else{
               /* 如果没有，就创建一个，然后保存*/
               var book = new Book(title, author, genre,pageCount,publisherID,ISBN);
               existingBooks[ISBN] =  book;
               return book;
           }
       }
   }
});

/**
 * [管理外部状态：BookRecordManager 借书管理类 单例]
 * @param  {Object} ){                                                  var           bookRecordDatabase [description]
 * @param  {[type]} updateCheckoutStatus: function(bookID, newStatus,    checkoutDate, checkoutMember,                     newReturnDate){        var record [description]
 * @param  {[type]} extendCheckoutPeriod: function(bookID, newReturnDate [description]
 * @return {[type]}                       [description]
 */
var BookRecordManager = (function(){
   var bookRecordDatabase = {};
   return{
    /*添加借书记录*/
    addBookRecord: function(id, title, author, genre,pageCount,publisherID,ISBN, checkoutDate, checkoutMember, dueReturnDate, availability){
        var book = bookFactory.createBook(title, author, genre,pageCount,publisherID,ISBN);
        bookRecordDatabase[id] ={
           checkoutMember: checkoutMember,
           checkoutDate: checkoutDate,
           dueReturnDate: dueReturnDate,
           availability: availability,
           book: book;

        };
    },
    /*更新借书状态*/
    updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember,     newReturnDate){
        var record = bookRecordDatabase[bookID];
        record.availability = newStatus;
        record.checkoutDate = checkoutDate;
        record.checkoutMember = checkoutMember;
        record.dueReturnDate = newReturnDate;
   },
   /*延长借书日期*/
   extendCheckoutPeriod: function(bookID, newReturnDate){
       bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
   },
   /*是否超出借书日期*/
   isPastDue: function(bookID){
       var currentDate = new Date();
       return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
   }
 };
});