(function () {
  document.addEventListener('plusready', function () {
    document.firstQuitTime = 0
    plus.key.addEventListener('backbutton', function () {
      var currentWebview = plus.webview.currentWebview()
      if (plus.webview.all()[0] === currentWebview) {
        var delatTime = new Date().getTime() - document.firstQuitTime
        if (document.firstQuitTime !== 0 && delatTime <= 2000) {
          plus.runtime.quit()
        } else {
          document.firstQuitTime = new Date().getTime()
          plus.nativeUI.toast('再按一次退出应用', {
            duration: 2000
          })
        }
      } else {
        currentWebview.close()
      }
    })
  }, false)
})()
