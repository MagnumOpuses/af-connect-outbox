test("Boot up server", async () => {
  const AfConnectOutbox = require("../app/app");
  const afConnectOutbox = new AfConnectOutbox();
  await afConnectOutbox.start();
  await afConnectOutbox.stop();
});
