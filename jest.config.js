/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: "./__tests__",
  moduleNameMapper: {
    "^@utils(.*)$": "<rootDir>/../src/utils$1",
    "^@hooks(.*)$": "<rootDir>/../src/hooks$1",
    "^@components(.*)$": "<rootDir>/../src/components$1",
    "^@pages(.*)$": "<rootDir>/../src/pages$1",
    "^@styles(.*)$": "<rootDir>/../src/styles$1",
    "^@types(.*)$": "<rootDir>/../src/types$1",
    "^@api(.*)$": "<rootDir>/../src/api$1",
    "^@context(.*)$": "<rootDir>/../src/context$1",
  },
};
