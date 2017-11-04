/**
 * @description base64Url转为blob图片，默认格式'image/png'
 * @name base64UrlToFile
 * @param {string} base64Url
 * @param {function} callback 回调函数，默认参数为图片文件
 */
function base64UrlToFile (option, successCB, errorCB) {
  try {
    let options
    if (typeof option === 'string') {
      options = {
        data: options
      }
    }
    let urlData = options.data
    let name = options.name || (new Date().getTime() + Math.floor(Math.random() * 10000).toString())
    let dataArr = urlData.split(',')
    let bytes = window.atob(dataArr[1])
    let type = dataArr[0].split(';')[0].split(':')[1]
    let fileName = name + '.' + type.split('/')[1]
    // 处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length)
    let ia = new Uint8Array(ab)
    for (let i = 0; i < bytes.length; i++) {
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
