"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allureCookies = require("allure-cookies");
exports.config = {
    //protractor
    SELENIUM_PROMISE_MANAGER: false,
    restartBrowserBetweenTests: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //jasmine
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 3000000,
        isVerbose: true
    },
    specs: ['./test.js'],
    params: {
        //selenidejs
        selenidejs: {
            windowSize: {
                width: 1800,
                height: 1100
            },
            timeouts: {
                toWaitElementsInMs: 5000,
                toHardWaitInMs: 3000
            }
        },
        onPrepare: async function () {
            jasmine.getEnv().addReporter(allureCookies.getJasmineAllureReporter({ basePath: './build', resultsDir: 'allure-results' }));
        }
    }
};
//# sourceMappingURL=protractor.conf.js.map