'use strict';

function handle404(err, req, res, next) {
  if(err === 'Invalid Model'){
    const errorObject = {
      status: 404,
      message: 'Sorry, we could not find what you were looking for',
    }; 
    res.status(404).json(errorObject);
  } else {
    next(err);
  }
}

module.exports = handle404;
