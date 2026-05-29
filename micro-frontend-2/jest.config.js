module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    // Handle CSS imports (requires identity-obj-proxy)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Handle image imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testPathIgnorePatterns: ["/node_modules/", "src/__tests__/test-utils.tsx"],
  coveragePathIgnorePatterns: [
    "src/types/",
    "\\.test\\.js$", // Exclude all test files from coverage
  ],
};
