import entryToBase64 from './entryToBase64'
/**
 * @description 调用摄像头并生成base64编码
 * @name cameraReadAsBase64
 * @param {function} successCB 成功回调，默认参数为base64
 * @param {function} errorCB 失败回调，默认参数为失败原因
 */
var cameraReadAsBase64 = function (successCB, errorCB) {
  plus.nativeUI.showWaiting()
  var cmr = plus.camera.getCamera()
  cmr.captureImage(function (p) {
    plus.io.resolveLocalFileSystemURL(p, function (entry) {
      entryToBase64(entry, successCB, errorCB)
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
