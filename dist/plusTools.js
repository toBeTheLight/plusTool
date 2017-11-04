(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["$plus"] = factory();
	else
		root["$plus"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/page/index.js
var view = {
  open: function open(url) {
    plus.nativeUI.showWaiting();
    // var id = /[\\|\/]\.?/
    var newPage = plus.webview.create(url);
    newPage.onloaded = function () {
      plus.nativeUI.closeWaiting();
      newPage.show('pop-in', 200);
    };
  },
  replace: function replace(url) {
    plus.nativeUI.showWaiting();
    // var id = /[\\|\/]\.?/
    var newPage = plus.webview.create(url);
    newPage.onloaded = function () {
      plus.nativeUI.closeWaiting();
      newPage.show('pop-in', 200, function () {
        plus.webview.currentWebview().close();
      });
    };
  }
};

/* harmony default export */ var page = (view);
// CONCATENATED MODULE: ./src/camera/base64ToFile.js
/**
 * @description base64Url转为blob图片，默认格式'image/png'
 * @name base64UrlToFile
 * @param {string} base64Url
 * @param {function} callback 回调函数，默认参数为图片文件
 */
function base64UrlToFile(option, successCB, errorCB) {
  try {
    var options = void 0;
    if (typeof option === 'string') {
      options = {
        data: options
      };
    }
    var urlData = options.data;
    var name = options.name || new Date().getTime() + Math.floor(Math.random() * 10000).toString();
    var dataArr = urlData.split(',');
    var bytes = window.atob(dataArr[1]);
    var type = dataArr[0].split(';')[0].split(':')[1];
    var fileName = name + '.' + type.split('/')[1];
    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    successCB(new File([ab], fileName, {
      type: type
    }));
  } catch (err) {
    errorCB && errorCB(err);
  }
}

/* harmony default export */ var base64ToFile = (base64UrlToFile);
// CONCATENATED MODULE: ./src/camera/entryToBase64.js
function entryToBase64(entry, successCB, errorCB) {
  plus.nativeUI.showWaiting();
  var reader = null;
  entry.file(function (file) {
    reader = new plus.io.FileReader();
    reader.onloadend = function (e) {
      successCB(e.target.result);
      plus.nativeUI.closeWaiting();
      reader.abort();
    };
    reader.readAsDataURL(file);
  }, function (e) {
    plus.nativeUI.closeWaiting();
    errorCB && errorCB('失败：' + e.message);
    reader.abort();
  });
}

/* harmony default export */ var camera_entryToBase64 = (entryToBase64);
// CONCATENATED MODULE: ./src/camera/photoBase64.js

/**
 * @description 调用摄像头并生成base64编码
 * @name cameraReadAsBase64
 * @param {function} callback 回调函数，默认参数为base64文件
 */
var photoBase64_cameraReadAsBase64 = function cameraReadAsBase64(successCB, errorCB) {
  plus.nativeUI.showWaiting();
  var cmr = plus.camera.getCamera();
  cmr.captureImage(function (p) {
    plus.io.resolveLocalFileSystemURL(p, function (entry) {
      camera_entryToBase64(entry, successCB, errorCB);
    }, function (e) {
      plus.nativeUI.closeWaiting();
      errorCB && errorCB('读取拍照文件错误：' + e.message);
    });
  }, function (e) {
    plus.nativeUI.closeWaiting();
    errorCB && errorCB('失败：' + e.message);
  }, {
    filename: '_doc/camera/',
    index: 1
  });
};
/* harmony default export */ var photoBase64 = (photoBase64_cameraReadAsBase64);
// CONCATENATED MODULE: ./src/camera/videoPath.js
function videoPath(successCB, errorCB) {
  console.log(successCB);
  console.log(errorCB);
  var cmr = plus.camera.getCamera();
  plus.nativeUI.showWaiting();
  cmr.startVideoCapture(function (p) {
    plus.io.resolveLocalFileSystemURL(p, function (entry) {
      plus.nativeUI.closeWaiting();
      successCB(entry.toLocalURL(), entry);
    }, function (err) {
      plus.nativeUI.closeWaiting();
      errorCB && errorCB(err);
    });
  }, function (err) {
    plus.nativeUI.closeWaiting();
    errorCB && errorCB(err);
  }, {
    filename: '_doc/camera/',
    index: 1
  });
}

/* harmony default export */ var camera_videoPath = (videoPath);
// CONCATENATED MODULE: ./src/camera/index.js





/* harmony default export */ var camera = ({
  base64ToFile: base64ToFile,
  photoBase64: photoBase64,
  videoPath: camera_videoPath,
  entryToBase64: camera_entryToBase64
});
// CONCATENATED MODULE: ./src/ui/sheetActions.js
var sheetActionsPool = [];
function sheetActions(optionsSheet) {
  var model = sheetActionsPool.pop();
  if (model === undefined) {
    var elWrapper = document.createElement('div');
    elWrapper.style.width = '100%';
    elWrapper.style.transform = 'translate3d(0,100%,0)';
    elWrapper.style.transition = 'all .3s linear';
    elWrapper.style.position = 'absolute';
    elWrapper.style.bottom = '0';
    elWrapper.style.left = '0';
    elWrapper.style.padding = '20px';
    elWrapper.style.backgroundColor = '#ccc';
    elWrapper.addEventListener('click', function () {
      elWrapper.style.transform = 'translate3d(0,100%,0)';
    });
    optionsSheet.forEach(function (element) {
      var elItem = document.createElement('div');
      elItem.style.lineHeight = '44px';
      elItem.innerText = element.text;
      elItem.style.textAlign = 'center';
      elItem.addEventListener('click', element.action);
      elWrapper.appendChild(elItem);
      setTimeout(function () {
        elWrapper.style.transform = 'translate3d(0,0,0)';
      }, 0);
    }, this);
    document.documentElement.appendChild(elWrapper);
  }
}

/* harmony default export */ var ui_sheetActions = (sheetActions);
// EXTERNAL MODULE: ./src/event/backButton.js
var backButton = __webpack_require__(1);
var backButton_default = /*#__PURE__*/__webpack_require__.n(backButton);

// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "view", function() { return page; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "camera", function() { return camera; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "sheetActions", function() { return ui_sheetActions; });







/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function () {
  document.addEventListener('plusready', function () {
    document.firstQuitTime = 0;
    plus.key.addEventListener('backbutton', function () {
      var currentWebview = plus.webview.currentWebview();
      if (plus.webview.all()[0] === currentWebview) {
        var delatTime = new Date().getTime() - document.firstQuitTime;
        if (document.firstQuitTime !== 0 && delatTime <= 2000) {
          plus.runtime.quit();
        } else {
          document.firstQuitTime = new Date().getTime();
          plus.nativeUI.toast('再按一次退出应用', {
            duration: 2000
          });
        }
      } else {
        currentWebview.close();
      }
    });
  }, false);
})();

/***/ })
/******/ ]);
});