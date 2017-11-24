document.addEventListener('plusready', function(){
  // 中间页关闭
  document.querySelector('#closeMiddlePage').addEventListener('click',function () {
    plusTools.page.open('./pageclose/level1.html')
  },false)
  // 拍照
  document.querySelector('#takePhoto').addEventListener('click',function () {
    plusTools.page.open('./photo/caremaToFile.html')
  },false)
  document.querySelector('#formData').addEventListener('click',function () {
    plusTools.page.open('./photo/formData.html')
  },false)
});
