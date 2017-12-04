/**
 * @description base64转为blob图片,与base64ToFile相比兼容较好
 * @name base64UrlToFile
 * @param {string/object} base64Url或配置对象(data)
 * @param {function} successCB 成功回调，默认参数为1.文件；2.文件格式后缀
 * @param {function} errorCB 失败回调，参数为失败原因
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
    let dataArr = urlData.split(',')
    let bytes = window.atob(dataArr[1])
    let type = dataArr[0].split(';')[0].split(':')[1]
    let ext = type.split('/')[1]
    // 处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length)
    let ia = new Uint8Array(ab)
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i)
    }
    successCB(new Blob([ab], {
      type: type
    }), ext)
  } catch (err) {
    errorCB && errorCB(err)
  }
}

export default base64UrlToFile
