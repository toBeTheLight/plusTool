/**
 * @description base64转为图片，与base64ToBlob相比兼容较差
 * @name base64UrlToFile
 * @param {string/object} base64Url或配置对象(data,name)
 * @param {function} successCB 成功回调，默认参数为图片文件
 * @param {function} errorCB 失败回调，参数为失败原因
 */
function base64UrlToFile (option, successCB, errorCB) {
  try {
    let options
    if (typeof option === 'string') {
      options = {
        data: options
      }
    } else {
      options = option
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
