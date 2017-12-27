
# webview

1. getWebviewById(id)
id为创建或打开webview时的完整路径，如create('../page/new.html?xxx=xxx')
获取时则写为getWebviewById('../page/new.html?xxx=xxx')

2. webview刷新
不推荐使用url传带可变状态的参数，无法较好完成刷新。
如 `open('info.html?type=3')`,修改后要显示`type=4`的数据则无法完成

# api

## config
### $plus.config(options)
```
options = {
  beforeBack: function () {
    // 函数内为页面回退前执行的js逻辑
  }
  backRule: function () {
    // 函数内为js逻辑，返回一个true或false
    // 为true则执行返回，为false则无操作
    return true/false
  }
}
```
## view

### 打开新页面

* 打开新页面
* url为目标页路径

$plus.view.open(url)


### 替换当前页
* 打开新页面后关闭当前页
* url为目标页路径

$plus.view.replace(url)

### 返回上一页
* 关闭当前页并返回上一未关闭页面，如没有未关闭页面则进入退出app逻辑
* 无参数
$plus.view.back()

## event

* 此部分有绑定安卓轻触返回事件，自动执行，无需手动调用

## ui
暂无

## camera

### $plus.camera.photoBase64(successCB, errorCB)

* 调用摄像头拍摄照片并返回base64
* 内部调用entryToBase64
* successCB成功回调，第一个参数为base64
* errorCB失败回调，第一个参数为失败信息字符串

### $plus.camera.entryToBase64(entry, successCB, errorCB)

* 传入plus调用摄像头后的文件路径并返回base64
* 不建议直接调用，为其他方法的辅助方法
* entry为plus调用摄像头后的文件路径
* successCB成功回调，第一个参数为base64
* errorCB失败回调，第一个参数为失败信息字符串

### $plus.camera.base64ToFile(option, successCB, errorCB)

* 传入base64返回文件，可使用formData上传
* 此方法兼容性不好，可使用`$plus.camera.base64ToBlob`
* option: Object|string
  *  Object = {name: '文件名', data: 'base64'} 对象时可配置文件名和base64数据
  *  string = 'base64' 字符串时默认为base64数据
* successCB成功回调，第一个参数为file文件
* errorCB失败回调，第一个参数为失败信息对象

### $plus.camera.base64ToBlob(option, successCB, errorCB)

* 传入base64返回一个Blob对象，可使用formData上传
* 此方法较`base64ToFile`兼容较好
* option: Object|string
  *  Object = {data: 'base64'} 对象时只可配置base64数据(为扩展保持对象格式)
  *  string = 'base64' 字符串时默认为base64数据
* successCB成功回调，第一个参数为Blob对象，第二个参数为文件格式后缀名，因Blob对象生成时不可命名，所以需`formData.append`时，手动命名。
* errorCB失败回调，第一个参数为失败信息对象

### $plus.camera.videoPath(successCB, errorCB)

* 调取摄像头并返回可预览文件路径和转数据路径
* successCB成功回调，第一个参数为可预览本地路径，即可使用`<video>`预览，第二个参数为文件路径，可使用其他接收`entry`方法继续处理
* errorCB失败回调，第一个参数为失败信息对象
