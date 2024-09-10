const path = require('path');

module.exports = (viewPath) => (req, res, next) => {
    res.locals.viewPath = viewPath;
    next();
};
