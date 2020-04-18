const { storeValue, getValue } = require("../app/controllers/main.controller");
const redis = require("../app/lib/redis");

describe("Main controller", () => {
  beforeAll(async () => {
    await redis.init();
  });

  afterAll(async () => {
    await redis.quit();
  });

  beforeEach(() => {
    jest.resetModules();
    jest.unmock("../app/service/token.service");
  });

  test("Test successful write value", async done => {
    jest.mock("../app/service/token.service", () => ({
      write: async () => true
    }));

    await storeValue(
      {
        body: {
          token: "abc",
          value: "123"
        }
      },
      {
        status: () => ({
          json: data => {
            expect(data.message).toBe("Success");
            done();
          },
          send: jest.fn()
        })
      }
    );
  });

  test("Test error thrown write value", async done => {
    jest.mock("../app/service/token.service", () => ({
      write: async () => {
        throw "an error";
      }
    }));

    try {
      await storeValue(
        {
          body: {
            token: "abc",
            value: "123"
          }
        },
        {
          status: code => ({
            json: () => {
              throw "another error";
            },
            send: jest.fn()
          })
        }
      );
    } catch (err) {
      expect(err).toBe("another error");
      done();
    }
  });

  /*test("Test error thrown get value", async done => {
    jest.mock("../app/service/token.service", () => ({
      read: async () => {
        throw "an error";
      }
    }));

    await getValue(
      {
        query: {
          sessionToken: "abc"
        }
      },
      {
        status: code => ({
          json: () => {
            expect(code).toBe(500);
            done();
          },
          send: jest.fn()
        })
      }
    );
  });*/

  /*
  test("Test successful get value", async done => {
    jest.mock("../app/service/token.service", () => ({
      read: async () => true
    }));

    await getValue(
      {
        query: {
          sessionToken: "abc"
        }
      },
      {
        status: () => ({
          json: () => {
            done();
          },
          send: jest.fn()
        })
      }
    );
  });

  test("Test unsuccessful get value", async done => {
    jest.mock("../app/service/token.service", () => ({
      read: async () => false
    }));

    await getValue(
      {
        query: {
          sessionToken: "abc"
        }
      },
      {
        status: () => ({
          json: () => {
            done();
          },
          send: jest.fn()
        })
      }
    );
  });
*/
  test("Test store and get value", async done => {
    const { AfConnectOutbox } = require("../app/app");
    const afConnectOutbox = new AfConnectOutbox();
    await afConnectOutbox.init();
    await afConnectOutbox.start();

    const res = {
      status: () => ({
        json: jest.fn(),
        send: jest.fn()
      })
    };

    await storeValue(
      {
        body: {
          token: "abc",
          value: "123"
        }
      },
      res
    );

    await getValue(
      {
        query: {
          sessionToken: "abc"
        }
      },
      res
    );

    await afConnectOutbox.stop();

    return done();
  });

  test("Test store stringifyable value", async done => {
    const { AfConnectOutbox } = require("../app/app");
    const afConnectOutbox = new AfConnectOutbox();
    await afConnectOutbox.init();
    await afConnectOutbox.start();

    const res = {
      status: () => ({
        json: jest.fn(),
        send: jest.fn()
      })
    };

    await storeValue(
      {
        body: {
          token: "abc",
          value: 123
        }
      },
      res
    );

    await afConnectOutbox.stop();

    return done();
  });

  test("Test store unstringifyable value", async done => {
    const { AfConnectOutbox } = require("../app/app");
    const afConnectOutbox = new AfConnectOutbox();
    await afConnectOutbox.init();
    await afConnectOutbox.start();

    const res = {
      status: () => ({
        json: jest.fn(),
        send: jest.fn()
      })
    };

    await storeValue(
      {
        body: {
          token: "abc",
          value: function willFail() {}
        }
      },
      res
    );

    await afConnectOutbox.stop();

    return done();
  });

  test("Test get value without session token", async done => {
    const { AfConnectOutbox } = require("../app/app");
    const afConnectOutbox = new AfConnectOutbox();
    await afConnectOutbox.init();
    await afConnectOutbox.start();

    const res = {
      status: () => ({
        json: jest.fn(),
        send: jest.fn()
      })
    };

    await getValue(
      {
        query: {
          sessionToken: undefined
        }
      },
      res
    );

    await afConnectOutbox.stop();

    return done();
  });
});
