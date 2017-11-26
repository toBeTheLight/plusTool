var page = {
  open (url) {
    plus.nativeUI.showWaiting()
    // var id = /[\\|\/]\.?/
    var newPage = plus.webview.create(url)
    newPage.onloaded = () => {
      plus.nativeUI.closeWaiting()
      newPage.show('pop-in', 200)
    }
  },
  jump (url) {
    plus.nativeUI.showWaiting()
    // var id = /[\\|\/]\.?/
    var newPage = plus.webview.create(url)
    newPage.onloaded = function () {
      plus.nativeUI.closeWaiting()
      newPage.show('pop-in', 200, function () {
        plus.webview.currentWebview().close()
      })
    }
  }
}

export default page
