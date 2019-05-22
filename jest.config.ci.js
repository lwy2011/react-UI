const base = require('./jest.config.js');
module.exports = Object.assign({}, base, {
    collectCoverage: true,  //是否收集测试覆盖率
    collectCoverageFrom: ["lib/**/*.{ts,tsx}", "!**/node_modules/**"],//测试的文件匹配
    coverageDirectory: 'coverage',//生成的报告放在哪
    coverageReporters: ['text', 'lcov'],//两个常用的报告
    reporters: ["jest-junit"],

});


//ci需要的