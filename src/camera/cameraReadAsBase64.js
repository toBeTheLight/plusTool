/**
 * @description 调用摄像头并生成base64编码
 * @name cameraReadAsBase64
 * @param {function} callback 回调函数，默认参数为base64文件
 */
var cameraReadAsBase64 = function (successCB, errorCB) {
  plus.nativeUI.showWaiting()
  var cmr = plus.camera.getCamera()
  cmr.captureImage(function (p) {
    plus.io.resolveLocalFileSystemURL(p, function (entry) {
      var reader = null
      entry.file(function (file) {
        reader = new plus.io.FileReader()
        reader.onloadend = function (e) {
          successCB(e.target.result)
          plus.nativeUI.closeWaiting()
          reader.abort()
        }
        reader.readAsDataURL(file)
      }, function (e) {
        plus.nativeUI.closeWaiting()
        errorCB && errorCB('失败：' + e.message)
        reader.abort()
      })
    }, function (e) {
      plus.nativeUI.closeWaiting()
      errorCB && errorCB('读取拍照文件错误：' + e.message)
    })
  }, function (e) {
    plus.nativeUI.closeWaiting()
    errorCB && errorCB('失败：' + e.message)
  }, {
    filename: '_doc/camera/',
    index: 1
  })
}
export default cameraReadAsBase64
