'use strict';

const { request } = require("express");

module.exports = (scope) => {
  return (request, response, next) => {
    try {
      if (request.user.permissions.includes(`${scope}`)) {
        next();
      }
      else {
        console.log(request.url)
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login');
    }
  }
}
