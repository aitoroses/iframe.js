# Iframe.js

It's a tool for working with Iframes, and get an easy communication between them

## Example of use

```js
/**
 * Suppossing we have an scenario with 3 Iframes (1 parent and 2 childs of it)
 * We execute this code from the first of the childs to access the second child.
 * The second child has a function on it's window called 'hello()'
 *
 * In this example we will override that function and execute it from the child 1.
 *
 * window.hello = function() {
 *   alert("IM THE IFRAME 2")
 * }
 *
 * child frames are sourced iframe1.html and iframe2.html
 */

var utils = new IframeUtils();

// Get directly the frame2 by searching recursively in its parent if it's not
// a child
var frame2 = utils.getIframeBySource("iframe2");

// when the frame 2 it's ready execute a callback
frame2.onReady(function() {

  // Call its hello method
  this.evaluate('hello()');

  // Replace the hello method with a custom function
  // accessing it's window
  this._window.hello = function() {
    alert('IFRAME 1 changed to IFRAME2')
  }

  // Evaluate again an check that it is diferrent result
  this.evaluate('hello()');

});

```
