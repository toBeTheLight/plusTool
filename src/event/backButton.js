import { back } from '../view'

(function () {
  document.addEventListener('plusready', function () {
    document.firstQuitTime = 0
    plus.key.addEventListener('backbutton', function () {
      back()
    })
  }, false)
})()
