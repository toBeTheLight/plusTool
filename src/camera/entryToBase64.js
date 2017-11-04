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
