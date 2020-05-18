const fetch = require("node-fetch");
const request = require("supertest");

const { validationResult } = require("express-validator");

describe("Validation tests", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.unmock("express-validator");
  });

  test("should send respond with errors", async done => {
    jest.mock("express-validator", () => ({
      validationResult: () => ({
        isEmpty: () => false,
        array: () => ["an error message"]
      })
    }));

    const validation = require("../app/middleware/validation.middleware");
    validation.validate(
      {},
      {
        status: () => ({
          json: errors => {
            expect(errors).toBeDefined();
            return done();
          }
        })
      },
      () => {}
    );
  });

  test("next func executed successfully", async done => {
    const validation = require("../app/middleware/validation.middleware");
    validation.validate({}, {}, () => {
      done();
    });
  });

  test("throwing error in next function", async done => {
    const validation = require("../app/middleware/validation.middleware");
    expect(() => {
      validation.validate({}, {}, () => {
        throw "an error";
      });
    }).toThrow();
    return done();
  });

  test("/", async done => {
    const { AfConnectOutbox } = require("../app/app");
    const afConnectOutbox = new AfConnectOutbox();
    await afConnectOutbox.init();

    request(afConnectOutbox.app)
      .get("/")
      .expect(200, done);
  });

  test("/store", async done => {
    const { AfConnectOutbox } = require("../app/app");
    const afConnectOutbox = new AfConnectOutbox();
    await afConnectOutbox.init();

    request(afConnectOutbox.app)
      .post("/store")
      .expect(422, done);
  });

  test("/envelop", async done => {
    const { AfConnectOutbox } = require("../app/app");
    const afConnectOutbox = new AfConnectOutbox();
    await afConnectOutbox.init();

    request(afConnectOutbox.app)
      .get("/envelop")
      //.send({ email: 'not_an_email', password: '1234' })
      .expect(422, done);
  });
});
