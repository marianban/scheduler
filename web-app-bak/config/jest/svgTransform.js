'use strict';

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/en/webpack.html

var transform = require('react-svg-core').transform;
var babelTransform = require('babel-core').transform;

module.exports = {
  process(src) {
    return babelTransform(transform({ jsx: false })(src).code, {
      babelrc: false,
      presets: ['babel-preset-react-app']
    });
  },
  getCacheKey() {
    return new Date().toISOString();
  }
};
