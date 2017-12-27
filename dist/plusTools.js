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
var view_namespaceObject = {};
__webpack_require__.d(view_namespaceObject, "open", function() { return view_open; });
__webpack_require__.d(view_namespaceObject, "replace", function() { return replace; });
__webpack_require__.d(view_namespaceObject, "back", function() { return back; });

// CONCATENATED MODULE: ./src/config/config.js
var __config = {};
function config(config) {
  __config.__beforeBack = config.beforeBack;
  __config.__backRule = config.backRule;
}

// CONCATENATED MODULE: ./src/config/index.js


// CONCATENATED MODULE: ./src/view/index.js


function view_open(url) {
  plus.nativeUI.showWaiting();
  // var id = /[\\|\/]\.?/
  var newPage = plus.webview.create(url);
  newPage.onloaded = function () {
    plus.nativeUI.closeWaiting();
    newPage.show('pop-in', 200);
  };
}
function replace(url) {
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
function back() {
  var currentWebview = plus.webview.currentWebview();
  // 为顶层页面则进入退出应用逻辑
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
    // $plus配置，回退相关处理
    if (__config.__backRule) {
      if (__config.__backRule.rule()) {
        currentWebview.close();
        __config.__beforeBack && __config.__beforeBack();
      } else {
        __config.__backRule.action();
      }
    } else {
      currentWebview.close();
      __config.__beforeBack && __config.__beforeBack();
    }
  }
}


// CONCATENATED MODULE: ./src/camera/base64ToFile.js
/**
 * @description base64转为图片，与base64ToBlob相比兼容较差
 * @name base64UrlToFile
 * @param {string/object} base64Url或配置对象(data,name)
 * @param {function} successCB 成功回调，默认参数为图片文件
 * @param {function} errorCB 失败回调，参数为失败原因
 */
function base64UrlToFile(option, successCB, errorCB) {
  try {
    var options = void 0;
    if (typeof option === 'string') {
      options = {
        data: options
      };
    } else {
      options = option;
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
// CONCATENATED MODULE: ./src/camera/base64ToBlob.js
/**
 * @description base64转为blob图片,与base64ToFile相比兼容较好
 * @name base64UrlToBlob
 * @param {string/object} base64Url或配置对象(data)
 * @param {function} successCB 成功回调，默认参数为1.文件；2.文件格式后缀
 * @param {function} errorCB 失败回调，参数为失败原因
 */
function base64UrlToBlob(option, successCB, errorCB) {
  try {
    var options = void 0;
    if (typeof option === 'string') {
      options = {
        data: options
      };
    } else {
      options = option;
    }
    var urlData = options.data;
    var dataArr = urlData.split(',');
    var bytes = window.atob(dataArr[1]);
    var type = dataArr[0].split(';')[0].split(':')[1];
    var ext = type.split('/')[1];
    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    successCB(new Blob([ab], {
      type: type
    }), ext);
  } catch (err) {
    errorCB && errorCB(err);
  }
}

/* harmony default export */ var base64ToBlob = (base64UrlToBlob);
// CONCATENATED MODULE: ./src/camera/entryToBase64.js
/**
 * @description plus路径转base64
 * @name cameraReadAsBase64
 * @param {function} successCB 成功回调，默认参数为base64
 * @param {function} errorCB 失败回调，默认参数为失败原因
 */

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
 * @param {function} successCB 成功回调，默认参数为base64
 * @param {function} errorCB 失败回调，默认参数为失败原因
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
/**
 * @description 调取摄像头录像并返回本地路径(视频文件较大，不推荐转base64预览)
 * @name cameraReadAsBase64
 * @param {function} successCB 成功回调，默认参数1.可预览本地路径；2.转文件等plus entry路径
 * @param {function} errorCB 失败回调，默认参数为失败原因
 */

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
  base64ToBlob: base64ToBlob,
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
    elWrapper.style.padding = '10px';
    elWrapper.style.backgroundColor = '#ccc';
    elWrapper.addEventListener('click', function () {
      elWrapper.style.transform = 'translate3d(0,100%,0)';
      elWrapper.addEventListener('transitionend', function () {
        elWrapper.remove();
      });
    });
    optionsSheet.forEach(function (element) {
      var elItem = document.createElement('div');
      elItem.style.lineHeight = '44px';
      elItem.innerText = element.text;
      elItem.style.textAlign = 'center';
      elItem.addEventListener('click', element.action);
      elWrapper.appendChild(elItem);
    }, this);
    setTimeout(function () {
      elWrapper.style.transform = 'translate3d(0,0,0)';
    }, 0);
    document.documentElement.appendChild(elWrapper);
  }
}

/* harmony default export */ var ui_sheetActions = (sheetActions);
// CONCATENATED MODULE: ./src/event/backButton.js


(function () {
  document.addEventListener('plusready', function () {
    document.firstQuitTime = 0;
    plus.key.addEventListener('backbutton', function () {
      back();
    });
  }, false);
})();
// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "view", function() { return view_namespaceObject; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "camera", function() { return camera; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "sheetActions", function() { return ui_sheetActions; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "config", function() { return config; });








/***/ })
/******/ ]);
});