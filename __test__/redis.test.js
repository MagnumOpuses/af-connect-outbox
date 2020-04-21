describe("redis", () => {
  test("client init, setValue, checkKeyExist, getValue, quit", async done => {
    const redis = require("../app/lib/redis/index");

    await redis.init();
    expect(await redis.checkKeyExist("abc")).toBeFalsy();
    await redis.setValue("abc", "123");
    expect(await redis.checkKeyExist("abc")).toBeTruthy();
    const value = await redis.getValue("abc");
    expect(value).toBe("123");
    await redis.deleteValue("abc");
    expect(await redis.checkKeyExist("abc")).toBeFalsy();
    const valueAgain = await redis.getValue("abc");
    expect(valueAgain).toBe(null);
    await redis.quit();
    return done();
  });

  test("connect failure", async done => {
    const redis = require("../app/lib/redis/index");

    const redisClient = await redis.init();
    redisClient.on("error", error => {
      console.log(error);
    });

    expect(() => redisClient.emit("error", new Error("some-error"))).toThrow();
    return done();
  });
});
