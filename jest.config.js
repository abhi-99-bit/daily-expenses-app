module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: [
    "js",
    "json",
    // tell Jest to handle `*.vue` files
    "vue",
  ],
  transform: {
    // process `*.js` files with `babel-jest`
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    // ".*\\.(js)$": "babel-jest",
    // ".*\\.(vue)$": "vue-jest",
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
  },
  // setupTestFrameworkScriptFile: "<rootDir>/tests/setup.js",
  setupFiles: ["./tests/setup.js"],
};
