describe("config", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.unmock("dotenv");
  });

  test("default properties", async done => {
    jest.mock("dotenv", () => ({
      config: () => {
        delete process.env.HEALTH_PORT;
        delete process.env.PORT;
        delete process.env.REDIS_HOST;
        return {};
      }
    }));

    const c = require("../app/lib/config");

    expect(c.healthPort).toBe(9802);
    expect(c.port).toBe(8100);
    expect(c.redisTimeout).toBe(300);
    expect(c.redis_host).toBe("redis-db");

    return done();
  });
});
