import { __config } from '../config/config.js'

function open (url) {
  plus.nativeUI.showWaiting()
  // var id = /[\\|\/]\.?/
  var newPage = plus.webview.create(url)
  newPage.onloaded = () => {
    plus.nativeUI.closeWaiting()
    newPage.show('pop-in', 200)
  }
}
function replace (url) {
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
function back () {
  var currentWebview = plus.webview.currentWebview()
  // 为顶层页面则进入退出应用逻辑
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
    // $plus配置，回退相关处理
    if (__config.__backRule) {
      if (__config.__backRule.rule()) {
        currentWebview.close()
        __config.__beforeBack && __config.__beforeBack()
      } else {
        __config.__backRule.action()
      }
    } else {
      currentWebview.close()
      __config.__beforeBack && __config.__beforeBack()
    }
  }
}

export {
  open,
  replace,
  back
}
