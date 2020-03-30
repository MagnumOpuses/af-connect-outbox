const express = require('express');
const router = express.Router();
const logformat = require('../lib/config/logformat');

const tokenService = require('../service/tokenService');

// middleware that is specific to this router
router.use((req, res, next) => {
  logformat(req, res);
  next();
});

// define the home page route
router.get('/', (req, res) => res.send(`AF-connect-outbox is alive`));

// define the register session token route
router.post('/store', tokenService.storeValue);

// define the get the envelop using the sessiontoken
router.get('/envelop?:sessionToken', tokenService.getValue)

module.exports = router;