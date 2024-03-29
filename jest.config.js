// Sync object
module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test)?(s).+(js|jsx)'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    'src(.*)$': '<rootDir>/src/$1',
    '@recoil(.*)$': '<rootDir>/src/recoil/$1',
    '__tests__(.*)$': '<rootDir>/__tests__/$1',
    '__mocks__(.*)$': '<rootDir>/__mocks__/$1',

  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/.setup.js'],
};
