'use strict';

function handle403(req, res, next) {

  const errorObject = {
    status: 403,
    message: 'Access denied',
  };

  res.status(404).json(errorObject);
}

module.exports = handle403;