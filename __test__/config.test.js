describe("config", () => {
  test("default properties", async done => {
    const c = require("../app/lib/config");

    expect(c.healthPort).toBe(9802);
    expect(c.port).toBe(8100);
    expect(c.redisTimeout).toBe(300);
    expect(c.redis_host).toBe("redis-db");

    return done();
  });
});
