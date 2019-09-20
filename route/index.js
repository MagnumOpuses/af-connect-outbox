const express = require('express');
const router = express.Router();

const tokenService = require('../service/tokenService');

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', (req, res) => res.send(`AF-connnect-outbox is alive`));

// define the register session token route
router.post('/registerToken', tokenService.registerValue);

// define the get the envelop using the sessiontoken
router.get('/envelop?:sessionToken', tokenService.getValue)

module.exports = router;