import { pathsToModuleNameMapper } from 'ts-jest';

const paths = {
  '@modules/*': ['./src/modules/*'],
  '@shared/*': ['./src/shared/*'],
};

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(paths, {
    prefix: '<rootDir>',
  }),
  testMatch: ['<rootDir>/test/unit/**/*.unit.spec.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  maxWorkers: '50%',
};
