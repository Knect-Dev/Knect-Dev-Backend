'use strict';

const express = require('express');
const app = express();



module.exports = {
  app,
  start: (port) => {
    if (!port) throw new Error('Missing Port');
    app.listen(port, () => {
      console.log(`LISTENING ON PORT ${port}`);
    });
  },
};
