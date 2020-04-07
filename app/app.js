const express = require("express");
const bodyParser = require("body-parser");

const config = require("./lib/config");

const routes = require("./route");
const logger = require("./lib/logger");

const CC = require("check-connectivity");
const cc = new CC({
  host: config.host,
  port: config.healthPort,
  debug: true,
  compatibleWith: {
    "af-portability": "^1.0.0-beta"
  }
}).listen();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);
app.use(routes);

app.listen(config.port, () =>
  console.log(`AF-connect outbox is running on port ${config.port}`)
);
