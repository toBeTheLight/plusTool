/**
 * @description 调取摄像头录像并返回本地路径(视频文件较大，不推荐转base64预览)
 * @name cameraReadAsBase64
 * @param {function} successCB 成功回调，默认参数1.可预览本地路径；2.转文件等plus entry路径
 * @param {function} errorCB 失败回调，默认参数为失败原因
 */

function videoPath (successCB, errorCB) {
  console.log(successCB)
  console.log(errorCB)
  var cmr = plus.camera.getCamera()
  plus.nativeUI.showWaiting()
  cmr.startVideoCapture(function (p) {
    plus.io.resolveLocalFileSystemURL(p,
      function (entry) {
        plus.nativeUI.closeWaiting()
        successCB(entry.toLocalURL(), entry)
      }, function (err) {
        plus.nativeUI.closeWaiting()
        errorCB && errorCB(err)
      })
  }, function (err) {
    plus.nativeUI.closeWaiting()
    errorCB && errorCB(err)
  }, {
    filename: '_doc/camera/',
    index: 1
  })
}

export default videoPath
