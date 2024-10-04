// jest.config.jsx
module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Use babel-jest for .js and .jsx files
  },
  moduleFileExtensions: ["js", "jsx"], // Recognize .js and .jsx extensions
  testEnvironment: "jsdom", // Set test environment to jsdom
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"], // Setup file for Jest
  verbose: true,
  // testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Bỏ qua các thư mục không cần thiết
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?)$", // Chỉ định mẫu cho file test
};
