const AfConnectOutbox = require("./app");

const afConnectOutbox = new AfConnectOutbox();
afConnectOutbox.start();

module.exports = afConnectOutbox;
