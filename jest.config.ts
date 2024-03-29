import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfigJson from './tsconfig.json';

function manageKey(key: string): string {
   return key.includes('(.*)') ? key.slice(0, -1) + '\\.js$' : key;
}
function manageMapper(mapper: Record<string, string>): Record<string, string> {
   const newMapper: Record<string, string> = {};
   for (const key in mapper) {
      newMapper[manageKey(key)] = mapper[key];
   }
   newMapper['^(.*).js$'] = '$1';
   return newMapper;
}

const config: Config.InitialOptions = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    verbose: true,
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: './tsconfig.json',
            useEsm: true
        }]
    }, 
    coverageProvider: 'v8',
    moduleNameMapper: manageMapper(pathsToModuleNameMapper(tsconfigJson.compilerOptions.paths, { prefix: '<rootDir>/' }) as Record<string, string>),
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};
export default config;   