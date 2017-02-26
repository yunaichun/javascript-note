/* 
惰性函数很好理解，假如同一个函数被大量范围，
并且这个函数内部又有许多判断来来检测函数，
这样对于一个调用会浪费时间和浏览器资源，
所以当第一次判断完成后，直接把这个函数改写，不在需要判断。
*/
/*原始函数*/
function createXHR(){
    var xmlhttp;
    try{
          //firfox,opear,safari
          xmlHttp=new XMLHttpRequest();
    }catch(e){
          try{
              xmlHttp=new ActiveXobject('Msxm12.XMLHTTP');
          }catch (e){
              try{
                    xmlHttp=new ActiveXobject("Microsoft.XMLHTTP");
              }catch(e){
                 alert("您的浏览器不支持AJAX");
                  return false;
              }
          }
    }
    return xmlHttp;
}


/*改为惰性函数*/
function createXHR(){
    var xhr=null;
    if(typeof XMLHttpRequest!='undefined'){
        xhr=new XMLHttpRequest();
        createXHR=function(){
              return new XMLHttpRequest();  //直接返回一个懒函数，这样不必在往下走
        };
      }else{
          try{
              xhr=new ActiveXObject("Msxml2.XMLHTTP");
              createXHR=function(){
                    return new ActiveXObject("Msxml2.XMLHTTP");
              };
          }catch(e){
              try{
                    xhr =new ActiveXObject("Microsoft.XMLHTTP");
                    createXHR=function(){
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    };
              }catch(e){
                    createXHR=function(){
                        return null;
                    };
              }       
        }
    }
    return xhr;
}
