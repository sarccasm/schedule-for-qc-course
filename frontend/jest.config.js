const esModules = ['react-icons'].join('|');

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.js'],

  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  moduleNameMapper: {
    '^.+\\.(css|less|scss|jpg|jpeg|png|svg)$': 'babel-jest',
  },

  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],

  resetMocks: true,

  collectCoverage: true,
  collectCoverageFrom: [
    "src/helper/**/*.js",
    "!src/helper/validateFields.js",
    "!src/helper/storeValidation.js"
  ],

  ccoverageThreshold: {
  global: {
    branches: 30,
    functions: 34,
    lines: 42,
    statements: 43,
  },
},
};