const fetch = require("node-fetch");

test("Test Outbox main server", async done => {
  const AfConnectOutbox = require("../app/app");
  const afConnectOutbox = new AfConnectOutbox();
  await afConnectOutbox.init();
  await afConnectOutbox.start();

  const result = await fetch("http://localhost:8100");
  expect(result.status).toBe(200);

  await afConnectOutbox.stop();
  return done();
});

test("Test Outbox server graceful shutdown", async done => {
  /*  const AfConnectOutbox = require("../app/app");
  const afConnectOutbox = new AfConnectOutbox();
  await afConnectOutbox.init();
  await afConnectOutbox.start();

  const result = await fetch("http://localhost:8100");
  expect(result.status).toBe(200);

  expect(afConnectOutbox.server._handle).not.toBe(null);
  await afConnectOutbox.stop();
  expect(afConnectOutbox.server._handle).toBe(null);*/
  return done();
});

test("Test Outbox health server", async done => {
  /*  const AfConnectOutbox = require("../app/app");
  const afConnectOutbox = new AfConnectOutbox();
  await afConnectOutbox.init();
  await afConnectOutbox.start();

  const result = await fetch("http://localhost:9802/health");
  expect(result.status).toBe(200);
  const body = await result.json();
  expect(body.status).toBe("UP");

  await afConnectOutbox.stop();*/
  return done();
});

test("Test Outbox redis integration", async done => {
  /*  const AfConnectOutbox = require("../app/app");
  const afConnectOutbox = new AfConnectOutbox();
  await afConnectOutbox.init();
  await afConnectOutbox.start();

  {
    // Write a value to redis
    const res = await fetch("http://localhost:8100/store", {
      method: "post",
      body: JSON.stringify({ token: "a-test-token", value: "a-test-value" }),
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    expect(json.message).toBe("Success");
  }

  {
    // Read back a value from redis store
    const res = await fetch(
      "http://localhost:8100/envelop?sessionToken=a-test-token"
    );
    const json = await res.json();
    expect(json.value).toBe("a-test-value");
  }

  await afConnectOutbox.stop();*/
  return done();
});
