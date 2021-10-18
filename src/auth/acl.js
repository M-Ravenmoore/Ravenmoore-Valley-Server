'use strict';

const { request } = require("express");

module.exports = (scope) => {
  return (request, response, next) => {
    const url = request.url;
    let page = url.slice(1);
    try {
      if (request.user.permissions.includes(`${scope}:${page}`)) {
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
