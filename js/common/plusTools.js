document.addEventListener('plusready', function() {
  plusTools.firstQuitTime = 0
  plus.key.addEventListener("backbutton", function() {
    var currentWebview = plus.webview.currentWebview()
    var parentWebview = currentWebview.opener()
    if(plus.webview.all()[0] === currentWebview){
      var delatTime = new Date().getTime() - plusTools.firstQuitTime
      if (plusTools.firstQuitTime !==0 && delatTime<= 2000 ) {
        plus.runtime.quit()
      } else {
        plusTools.firstQuitTime = new Date().getTime()
        plus.nativeUI.toast("再按一次退出应用", {
          duration: 2000
        })
      }
    }else{
      currentWebview.close()
    }
  })
}, false)

var plusTools = {}
plusTools.page = {
  open: function (url) {
    plus.nativeUI.showWaiting()
    var id = /[\\|\/]\.?/
    var newPage = plus.webview.create(url)
    newPage.onloaded = function () {
      plus.nativeUI.closeWaiting()
      newPage.show
      newPage.show('pop-in',200)
    }
  },
  jump: function(url) {
    plus.nativeUI.showWaiting()
    var id = /[\\|\/]\.?/
    var newPage = plus.webview.create(url)
    newPage.onloaded = function () {
      plus.nativeUI.closeWaiting()
      newPage.show
      newPage.show('pop-in', 200, function () {
        plus.webview.currentWebview().close()
      })
    }
  }
} 

/**
 * @description 调用摄像头并生成base64编码
 * @name cameraReadAsBase64
 * @param {function} callback 回调函数，默认参数为base64文件
 */
plusTools.cameraReadAsBase64 = function(successCB, errorCB) {
  plus.nativeUI.showWaiting()
  var cmr = plus.camera.getCamera();
  cmr.captureImage(function(p) {
    plus.io.resolveLocalFileSystemURL(p, function(entry) {
      var reader = null;
      entry.file(function(file) {
        reader = new plus.io.FileReader();
        reader.onloadend = function(e) {
          successCB(e.target.result)
          plus.nativeUI.closeWaiting()
          reader.abort();
        };
        reader.readAsDataURL(file);
      }, function(e) {
        plus.nativeUI.closeWaiting()
        errorCB && errorCB('失败：' + e.message);
        reader.abort();
      });
    }, function(e) {
      plus.nativeUI.closeWaiting()
      errorCB && errorCB('读取拍照文件错误：' + e.message);
    });
  }, function(e) {
    plus.nativeUI.closeWaiting()
    errorCB && errorCB('失败：' + e.message);
  }, {
    filename: '_doc/camera/',
    index: 1
  });
}
/**
 * @description base64Url转为blob图片，默认格式'image/png'
 * @name base64UrlToFile
 * @param {string} base64Url
 * @param {function} callback 回调函数，默认参数为图片文件
 */
plusTools.base64UrlToFile = function(options, successCB, errorCB) {
  try{
    var urlData = options.data
    var name = options.name || (new Date().getTime() + Math.floor(Math.random () * 10000).toString())
    var dataArr = urlData.split(',')
    var bytes = window.atob(dataArr[1])
    var type = dataArr[0].split(';')[0].split(':')[1]
    var fileName = options.name + '.' + type.split('\/')[1]
    //处理异常,将ascii码小于0的转换为大于0  
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for(var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    successCB(new File([ab], fileName, {
      type: type
    }))
  } catch (err) {
    errorCB && errorCB(err)
  }
}