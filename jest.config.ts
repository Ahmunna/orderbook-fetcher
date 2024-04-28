import { Config } from '@jest/types'

const config: Config.InitialOptions = {
    automock: true,
    collectCoverage: false,
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true
};

export default config;