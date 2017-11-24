###Welcome to use MarkDown

## webview

1. getWebviewById(id)
id为创建或打开webview时的完整路径，如create('../page/new.html?xxx=xxx')
获取时则写为getWebviewById('../page/new.html?xxx=xxx')

2. webview刷新
不推荐使用url传带可变状态的参数，无法较好完成刷新。
如 `open('info.html?type=3')`,修改后要显示`type=4`的数据则无法完成
