export default {
    preset: "ts-jest",
    
    testEnvironment: "node",
    collectCoverage: false,
    coverageReporters: ["text", "lcov"],
    coverageDirectory: "coverage",
    testMatch: ["**/*.test.ts"], 
    moduleFileExtensions: ["ts", "js", "json", "node"],
  }