const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const config = require("./lib/config");
const redis = require("./lib/redis");

const routes = require("./route");
const logger = require("./lib/logger");

const CC = require("check-connectivity");

module.exports = function() {
  this.app = undefined;
  this.server = undefined;
  this.cc = undefined;

  this.init = async function() {
    this.cc = new CC({
      host: config.host,
      port: config.healthPort,
      debug: true,
      compatibleWith: {
        "af-portability": "^1.0.0-beta"
      }
    });

    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(logger.middleware);
    this.app.use(routes);

    this.server = http.createServer(this.app);

    return this;
  };

  this.start = async function() {
    await this.cc.startup();
    await redis.init();

    await new Promise((resolve, reject) => {
      this.server.listen(config.port, () => {
        console.log(`AF Connect Outbox server running on port ${config.port}`);
        return resolve(this);
      });
    });

    return this;
  };

  this.stop = async function() {
    if (this.server === undefined) {
      return this;
    }

    await this.cc.shutdown();
    await redis.quit();

    await new Promise((resolve, reject) => {
      this.server.close(() => {
        console.log("AF Connect Outbox server terminated successfully");
        return resolve();
      });
    });

    return this;
  };
};
