module.exports = {
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  setupFilesAfterEnv: ["./jest.setup.js"],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.test.js",
    "!src/constants/*.js",
    "!src/config/*.js",
    "!src/model/*.js",
    "!src/dao/*.js",
    "!src/dto/*.js",
    "!src/index.js",
    "!*.js",
    "!node_modules/**",
  ],
};
