// dropshipping-backend/jest.config.cjs
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testTimeout: 30000,
  moduleFileExtensions: ['js', 'json', 'node'],
  transform: {}, // sem transformações adicionais
  testMatch: ['**/src/tests/**/*.test.js'],
};
