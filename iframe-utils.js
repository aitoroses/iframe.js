/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function(root, factory) {

	  root.IframeUtils = factory();

	})(window, function factory() {

	  return __webpack_require__(1);

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Document = __webpack_require__(2);

	var IframeUtils = module.exports = function IframeUtils(w) {
	  this._window = w || window;
	}

	IframeUtils.prototype.getParent = function() {
	  if (parent.window.IframeUtils) {
	    return new IframeUtils(window.parent);
	  } else {
	    throw Error('Parent has not defined IframeUtils');
	  }
	}

	IframeUtils.prototype.getDocument = function() {
	  return this._window.document;
	}

	IframeUtils.prototype.getFrameElement = function() {
	  this._window.frameElement;
	}

	IframeUtils.prototype.query = function(selector) {
	  return $(selector, this.getDocument());
	}

	IframeUtils.prototype.getIframeBySource = function(content, recursive) {
	  var iframes = Array.prototype.filter.call(this.query('iframe'), function(f) {
	      return f.src.match(content);
	  });

	  // If frames length it's null find on its parent
	  if (iframes.length == 0) {
	    var parent = this.getParent();
	    iframes = parent.getIframeBySource.call(parent, content, true);
	  }

	  if (recursive) {
	    return iframes;
	  } else {
	    return iframes[0] && iframes[0].contentWindow && new IframeUtils(iframes[0].contentWindow);
	  }

	}

	IframeUtils.prototype.evaluate = function(expression) {
	  this._window.eval(expression);
	}

	IframeUtils.prototype.onReady = function(callback) {
	  // WAIT for that frame to be ready
	  var context = this;
	  $(this.getDocument()).ready(function() {
	    setTimeout(callback.bind(context))
	  });
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Document = module.exports = function Document(d) {

	  this._document = d || document;

	};

	Document.prototype.getDocument = function() {
	  return this._document;
	}


/***/ }
/******/ ])
