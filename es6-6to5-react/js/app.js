import React from 'react';
import Bar from './components/bar';

global.app = function() {
  var body = document.getElementsByTagName('body')[0];

  React.render(<Bar/>, body);
};
