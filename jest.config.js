module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(test).[jt]s?(x)'],
};
