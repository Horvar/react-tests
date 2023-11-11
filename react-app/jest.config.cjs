module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    'jest-fetch-mock'
  ],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./styleMock.js')
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest'
  },
};
