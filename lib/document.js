var Document = module.exports = function Document(d) {

  this._document = d || document;

};

Document.prototype.getDocument = function() {
  return this._document;
}
