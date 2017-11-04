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
