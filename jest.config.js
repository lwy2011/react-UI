// https://jestjs.io/docs/en/configuration.html

module.exports = {
    verbose: true,
    clearMocks: false,
    collectCoverage: true,  //是否收集测试覆盖率
    collectCoverageFrom: ["lib/**/*.{ts,tsx}", "!**/node_modules/**"],//测试的文件匹配
    coverageDirectory: 'coverage',//生成的报告放在哪
    coverageReporters: ['text', 'lcov'],//两个常用的报告
    reporters: ["default", "jest-junit"],
    // reporters: ["default", "jest-junit"],

    // globals: {
    //     'ts-jest': {
    //         tsConfig: 'tsconfig.test.json',
    //     },
    // },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleDirectories: ['node_modules', 'include'],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/file-mock.js",
        "\\.(css|less|sass|scss)$": "<rootDir>/test/__mocks__/object-mock.js",
    },
    testMatch: ['<rootDir>/**/__tests__/**/*.unit.(js|jsx|ts|tsx)'], //测试文件的设置
    transform: {
        "^.+unit\\.(js|jsx)$": "babel-jest",
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: ["<rootDir>test/setupTests.js"]
};