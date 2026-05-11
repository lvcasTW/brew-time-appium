function fn() {
  const env = karate.env || "local";
  const config = {
    baseUrl: "https://httpbin.org",
  };
  karate.log("karate.env =", env, "baseUrl =", config.baseUrl);
  return config;
}
