'use strict';
module.exports = (scope) => {
  return (req, res, next) => {
    try {
      if (req.user.permissions.includes(scope)) {
        next();
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login');
    }
  }
}
