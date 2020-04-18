describe("logger", () => {
  test("middleware", async done => {
    const { middleware } = require("../app/lib/logger");
    let req = {};
    let res = {};
    middleware(req, res, () => {
      return done();
    });
  });

  test("format", async done => {
    const { format } = require("../app/lib/logger");
    expect(format({ hello: "world" })).toBe('{"hello":"world"}');
    return done();
  });
});
