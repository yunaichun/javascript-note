let arr = ['/getImgOne', '/getImgTwo'];
for (let i = 0, len = arr.length; i < len; i++) {
    let req = new XMLHttpRequest();
    req.open('GET', arr[i], true);
    req.responseType = "blob";
    //req.setRequestHeader("client_type", "DESKTOP_WEB");
    req.onreadystatechange = () => {
      if (req.readyState == 4 && req.status == 200) {
        postMessage(req.response);
      } else {
        postMessage('请求不成功');
      }
  }
  req.send(null);
}