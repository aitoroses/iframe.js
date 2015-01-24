var Window = module.exports = function Window(w) {

  this._window = w || window;

};

Window.prototype.getWindow = function() {
  return this._window;
}
