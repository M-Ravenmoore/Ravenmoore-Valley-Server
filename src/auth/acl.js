'use strict';
module.exports = (scope) => {
  return (request, response, next) => {
    try {
      if (request.user.permissions.includes(scope)) {
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
