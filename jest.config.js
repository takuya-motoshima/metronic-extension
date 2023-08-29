/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // testEnvironment: 'node',
  moduleNameMapper: {
    '^~/(.+)$': '<rootDir>/src/$1'
  },
  verbose: true,
  testMatch: [
    '<rootDir>/__tests__/**/*.test.ts'
  ],
};