var formData = new FormData()
var data = {
  uid: '1rDga5RG',
  patrol_id: '4yLvmNZM',
  lat: 0,
  lon: 0,
  main_pro_id: 10000000,
  sub_pro_id: 10000002,
  content: 'file图片测试',
  type: 0,
  phone: '15803933031',
  addr: '天安门'
}
formData.append('send_json', JSON.stringify(data))
document.querySelector('#photo').addEventListener('click', function () {
  plusTools.cameraReadAsBase64(
    function (base64) {
      var img = document.createElement('img')
      img.src = base64
      document.querySelector('.img-wrapper').appendChild(img)
      plusTools.base64UrlToFile({
        data: base64,
        name: new Date().getTime()
      }, function (file) {
        formData.append('file', file)
      }, function (err) {
        console.log(err.message)
      })
    },
    function (err){
      alert(err)
    }
  )
}, false)

document.querySelector('#video').addEventListener('click', function () {
  var cmr = plus.camera.getCamera()
  plus.nativeUI.showWaiting()
  cmr.startVideoCapture(function(p) {
    plus.io.resolveLocalFileSystemURL(p, function(entry) {
      var vd = document.createElement('video')
      vd.autoplay = true
      vd.src = entry.toLocalURL()
      document.querySelector('.img-wrapper').appendChild(vd)
      
      var reader = null;
      entry.file(function(file) {
        reader = new plus.io.FileReader();
        reader.onloadend = function(e) {
          var vd = document.createElement('video')
          vd.autoplay = true
          vd.src = e.target.result
          document.querySelector('.img-wrapper').appendChild(vd)
          
          
          plusTools.base64UrlToFile({
            data: e.target.result,
            name: new Date().getTime()
          }, function (file) {
            formData.append('file', file)
            plus.nativeUI.closeWaiting()
          }, function (err) {
            console.log(err.message)
            plus.nativeUI.closeWaiting()
          })

          reader.abort();
        };
        reader.readAsDataURL(file);
      }, function(e) {
        plus.nativeUI.closeWaiting()
        reader.abort();
      });
      
    }, function(e) {
      plus.nativeUI.closeWaiting()
      alert('读取拍照文件错误：' + e.message);
    });
  }, function(e) {
    plus.nativeUI.closeWaiting()
    alert('失败：' + e.message);
  }, {
    filename: '_doc/camera/',
    index: 1
  });
})


document.querySelector('#submit').addEventListener('click', function () {
  try{
    plus.nativeUI.showWaiting()
    $.ajax('http://192.168.0.236:3000/file', {
      data: formData,
      type: 'post',
      cache: false,
      processData: false,
      contentType: false,
      success: function(res) {
        plus.nativeUI.closeWaiting()
        if(res.code === '0') {
          plus.nativeUI.toast('提交成功')
        } else {
          plus.nativeUI.alert(res.msg)
        }
      },
      error: function(err) {
        plus.nativeUI.closeWaiting()
        plus.nativeUI.alert(err.message)
      }
    })
  }catch(e){
  plus.nativeUI.alert(e.message)
  }
}, false)

function progressHandlingFunction (e) {
  if(e.lengthComputable) {
    document.querySelector('#submit').innerHTML = (e.loaded / e.total * 100)
  }
}
