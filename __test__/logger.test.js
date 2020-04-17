test("should pass", async done => {
  const { format } = require("../app/lib/logger");
  const jsonEntry = {
    meta: {
      req: {
        url: "/cvForm",
        headers: {
          host: "127.0.0.1:3000",
          connection: "close",
          "content-length": "9598",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
          "content-type": "application/json",
          origin: "http://af-connect.local:3000",
          "accept-encoding": "gzip, deflate",
          "accept-language": "sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7",
          cookie:
            "AMV_SSO_COOKIE=AAAAAgABAFj4ln2iVU1mXuYsKUgBIoG%2F4wTm5ech%2F5gEP7%2BXF8L9Ut7aGGWPgP6JU5xwYAqHaS520TxGXL7spoFbiYzOndbkp5ojVWKWJXL0IvfASbQoZWJ15Mqxy1p7"
        },
        method: "POST",
        httpVersion: "1.0",
        originalUrl: "/cvForm",
        query: {}
      },
      res: { statusCode: 200 },
      responseTime: 6
    },
    level: "info",
    message: "HTTP POST /cvForm",
    timestamp: "2020-04-16T15:56:11.279Z"
  };
  const logEntry = format(jsonEntry);

  const expectedResult =
    '{"meta":{"req":{"url":"/cvForm","headers":{"host":"127.0.0.1:3000","connection":"close","content-length":"9598","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36","content-type":"application/json","origin":"http://af-connect.local:3000","accept-encoding":"gzip, deflate","accept-language":"sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7","cookie":"AMV_SSO_COOKIE=AAAAAgABAFj4ln2iVU1mXuYsKUgBIoG%2F4wTm5ech%2F5gEP7%2BXF8L9Ut7aGGWPgP6JU5xwYAqHaS520TxGXL7spoFbiYzOndbkp5ojVWKWJXL0IvfASbQoZWJ15Mqxy1p7"},"method":"POST","httpVersion":"1.0","originalUrl":"/cvForm","query":{}},"res":{"statusCode":200},"responseTime":6},"level":"info","message":"HTTP POST /cvForm","timestamp":"2020-04-16T15:56:11.279Z"}';

  expect(logEntry).toBe(expectedResult);
  return done();
});

test("should pass", async done => {
  const { middleware } = require("../app/lib/logger");
  //let called = false;
  let req = {};
  const result = middleware(req, undefined, () => {
    console.log("executed: ", req.executed);
    expect(req.executed).toBe(123);
    return done();
    //    called = true;
  });
});
