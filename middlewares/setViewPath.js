const path = require('path');

module.exports = function(viewPath) {
  return function(req, res, next) {
    res.locals.viewPath = viewPath;
    next();
  };
};
