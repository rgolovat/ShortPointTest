const jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
const path = require('path');

exports.config = {
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--lang=en-GB', '--start-maximized'],
      prefs: {
        'download': {
          'prompt_for_download': false,
          'ignore-certificate-errors': true
        }
      }
    }
  },
  framework: 'jasmine2',
  specs: [ '../node_modules/dist/**/*spec.js' ],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    stopSpecOnExpectationFailure: false,
    isVerbose: true
  },
  onPrepare: function () {
    browser.waitForAngularEnabled(false);
    jasmine.getEnv().addReporter(new jasmine2HtmlReporter({
      savePath: path.resolve(__dirname + './../reports/')
    })
    );
  }
};
