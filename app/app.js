const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const config = require("./lib/config");

const routes = require("./route");
const logger = require("./lib/logger");

const CC = require("check-connectivity");

module.exports = function() {
  this.app = undefined;
  this.server = undefined;
  this.cc = undefined;

  this.start = async function() {
    return new Promise((resolve, reject) => {
      // The check-connectivity module, does not provide any means to
      // await the final result of starting up the embedded server.
      // Therefore, we can't know if the embedded server has started
      // up correctly. So as a temporary workaround, we will simply
      // assume that the embedded server has booted up within 1 second.
      return new Promise(resolve => {
        this.cc = new CC({
          host: config.host,
          port: config.healthPort,
          debug: true,
          compatibleWith: {
            "af-portability": "^1.0.0-beta"
          }
        }).listen();

        setTimeout(() => {
          resolve();
        }, 1000);
      })
        .then(() => {
          return new Promise((resolve, reject) => {
            this.app = express();
            this.app.use(bodyParser.urlencoded({ extended: false }));
            this.app.use(bodyParser.json());
            this.app.use(logger);
            this.app.use(routes);

            this.server = http.createServer(this.app);

            this.server.listen(config.port, () => {
              console.log(
                `AF Connect Outbox server running on port ${config.port}`
              );
              return resolve(this);
            });
          });
        })
        .then(() => {
          this.cc.shutdown();
          return resolve();
        });
    });
  };

  this.stop = function() {
    return new Promise((resolve, reject) => {
      if (this.server === undefined) {
        return resolve();
      }
      this.server.close(() => {
        console.log("AF Connect Outbox server terminated successfully");
        return resolve();
      });
    });
  };
};
