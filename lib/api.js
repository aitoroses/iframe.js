var Document = require('./document');

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
