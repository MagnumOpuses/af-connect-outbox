const express = require('express');
const bodyParser = require('body-parser');

const config = require('./lib/config');

const routes = require('./route');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes);

app.listen(config.port, () => console.log(`AF-connect outbox is running on port ${config.port}`));

