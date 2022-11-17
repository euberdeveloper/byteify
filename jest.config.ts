import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    verbose: true,
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: './tsconfig.json',
        }]
    },    
    collectCoverageFrom: ["./source/**"],
    coverageProvider: 'v8',
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};
export default config;