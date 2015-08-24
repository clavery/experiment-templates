var assert = require('assert');
var jsdom = require('jsdom');


var LIBS = ["https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"];


describe('some html', function() {

  var html = `
  <p>testing</p>
  `;

  it('should parse the html', function(done) {
    var testFunc = function(e, window) {
      var document = window.document;
      var content = document.querySelectorAll("p")[0].innerHTML;
      assert.equal("testing", content);
      done();
    };

    jsdom.env(html, LIBS, testFunc);
  });

});
