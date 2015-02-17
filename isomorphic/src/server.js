require('node-jsx').install({extension: '.jsx'});

var http = require('http');
var director = require('director');
var React = require('react');
var Foo = require('./components.jsx').Foo;
var fs = require('fs');

var buf = fs.readFileSync("index.html", "utf8");
var j = JSON.parse(fs.readFileSync("json/todos.json", "utf8"));


var router = new director.http.Router({
  '/': {
    get: mainRoute
  },
  '/json/todos.json': {
    get: function() {
      this.res.writeHead(200, { 'Content-Type': 'application/json' })
      this.res.end(JSON.stringify(j));
    }
  }
});


function mainRoute() {
  var rendered = React.renderToString(React.createElement(Foo, {data: j}));
  var body = buf.replace('<body>', '<body>' + rendered + '<script>var initialState = ' + JSON.stringify(j) + ';</script>' );

  this.res.writeHead(200, { 'Content-Type': 'text/html' })
  this.res.end(body);
}

var server = http.createServer(function (req, res) {
  router.dispatch(req, res, function (err) {
    if (err) {
      res.writeHead(404);
      res.end();
    }
  });
});

server.listen(8081);
