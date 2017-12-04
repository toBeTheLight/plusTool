/**
 * @description plus路径转base64
 * @name cameraReadAsBase64
 * @param {function} successCB 成功回调，默认参数为base64
 * @param {function} errorCB 失败回调，默认参数为失败原因
 */

function entryToBase64 (entry, successCB, errorCB) {
  plus.nativeUI.showWaiting()
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
}

export default entryToBase64
