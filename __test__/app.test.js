describe("app", () => {
  test("init", async done => {
    const { AfConnectOutbox } = require("../app/app");
    const afConnectOutbox = new AfConnectOutbox();
    await afConnectOutbox.init();
    return done();
  });

  test("start", async done => {
    const { AfConnectOutbox } = require("../app/app");
    const afConnectOutbox = new AfConnectOutbox();
    await afConnectOutbox.init();
    await afConnectOutbox.start();
    await afConnectOutbox.stop();
    return done();
  });
});
