/**
 * @description base64Url转为blob图片，默认格式'image/png'
 * @name base64UrlToFile
 * @param {string} base64Url
 * @param {function} callback 回调函数，默认参数为图片文件
 */
function base64UrlToFile (options, successCB, errorCB) {
  try {
    var urlData = options.data
    var name = options.name || (new Date().getTime() + Math.floor(Math.random() * 10000).toString())
    var dataArr = urlData.split(',')
    var bytes = window.atob(dataArr[1])
    var type = dataArr[0].split(';')[0].split(':')[1]
    var fileName = name + '.' + type.split('/')[1]
    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length)
    var ia = new Uint8Array(ab)
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i)
    }
    successCB(new File([ab], fileName, {
      type: type
    }))
  } catch (err) {
    errorCB && errorCB(err)
  }
}

export default base64UrlToFile
