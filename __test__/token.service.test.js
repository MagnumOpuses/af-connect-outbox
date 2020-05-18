const { write, read } = require("../app/service/token.service");

describe("token service", () => {
  test("write", async done => {
    const redis = require("../app/lib/redis");
    await redis.init();
    const result = await write("abc", "123");
    expect(result).toBeTruthy();
    await redis.quit();
    return done();
  });

  test("read", async done => {
    const redis = require("../app/lib/redis");
    await redis.init();
    await write("abc", "123");
    const result = await read("abc");
    expect(result).toBe("123");
    await redis.quit();
    return done();
  });
});
