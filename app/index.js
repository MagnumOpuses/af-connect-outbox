const { AfConnectOutbox } = require("./app");

const afConnectOutbox = new AfConnectOutbox();
afConnectOutbox.init();
afConnectOutbox.start();

module.exports = afConnectOutbox;
