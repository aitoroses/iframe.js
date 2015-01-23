
/**
 * Module that returns a wrapper for an API
 */

module.exports = function(moduleName, factory, root) {
  debugger
  (function (root, factory) {

    if(typeof define === "function" && define.amd) {
      define(factory);

    } else if(typeof module === "object" && module.exports) {
      module.exports = factory();

    } else {
      root[moduleName] = factory();
    }
  })(root ,factory);

}
