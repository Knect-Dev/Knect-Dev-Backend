'use strict';

function handle404(err, req, res, next) {

  if(err.message === 'Not Allowed'){
    const errorObject = {
      status: 404,
      message: 'Sorry, we could not find what you were looking for',
    }; 
    res.status(404).json(errorObject);
  }
  next();
}

module.exports = handle404;
