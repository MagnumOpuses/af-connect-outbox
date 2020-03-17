const express = require("express");
const bodyParser = require("body-parser");

const config = require("./lib/config");

const routes = require("./route");
const Health = require("check-connectivity");
const health = new Health({
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
app.use(routes);

app.listen(config.port, () =>
  console.log(`AF-connect outbox is running on port ${config.port}`)
);
