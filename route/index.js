const express = require('express');
const router = express.Router();

const sessionToken = require('./sessionToken');

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', (req, res) => res.send(`AF-connnect-outbox is alive`));

// define the about route
router.post('/sessionToken', sessionToken);

module.exports = router;