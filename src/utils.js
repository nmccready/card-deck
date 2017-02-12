const through = require('through2');

function isNumeric(val){
  return !isNaN(val);
}

function handleInputStream(responseHandle){
  function _through(data, enc, cb){
    responseHandle(data, cb);
  }
  return through.obj(_through);
}

module.exports = {
  isNumeric,
  handleInputStream
};
