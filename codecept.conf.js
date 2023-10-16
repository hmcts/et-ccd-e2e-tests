const { setCommonPlugins } = require('@codeceptjs/configure');

const testConfig = require('./config.js');

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: testConfig.TestsPathToRun,
  output: `${process.cwd()}/${testConfig.TestReportFolder}`,
  helpers: {
    Playwright: {
      url: testConfig.TestUrl,
      show: testConfig.TestShowBrowserWindow,
      restart: false,
      timeout: 5000,
      waitForNavigation: 'domcontentloaded',
      waitForTimeout: 10000,
      ignoreHTTPSErrors: true,
      windowSize: '1920x1080',
    },
    REST: {
      endpoint: 'https://idam-api.aat.platform.hmcts.net/loginUser',
    },
  },
  include: {
    I: './test/pages/steps_file.js',
    basePage: './test/pages/basepage.page.js',
    loginPage: './test/pages/login.page.js',
    taskListPage: './test/pages/taskList.page.js',
    personalDetailsPage: './test/pages/personalDetails.page.js',
    employmentAndRespondentDetailsPage: './test/pages/employmentAndRespondentDetails.page.js',
    caseOverviewPage: './test/pages/caseoverview.pages.js',
    claimDetailsPage: './test/pages/claimDetail.page.js',
    submitClaimPage: './test/pages/submitClaim.page.js',
    caseListPage: './test/pages/caselist.page.js',
    et1CaseVettingPages: './test/pages/et1casevetting.pages.js',
    et1CaseServingPages: './test/pages/et1caseserving.pages.js',
    citizenHubPages: './test/pages/citizenhub.pages.js',
    judgementCollectionPage: './test/pages/judgementCollection.page.js',
    makeanApplicationPage: './test/pages/application.page.js',
    et3NotificationPages: './test/pages/et3Notification.pages.js',
    applicationsTabsPages: './test/pages/applicationsTabs.pages.js',
    sendNotificationPages: './test/pages/sendNotification.pages.js',
    legalRepNOCPages: './test/pages/legalRep.pages.js',
    respondentRepresentativePage: './test/pages/respondentRepresentative.pages.js',
    referralPages: './test/pages/referrals.pages.js',
    workAllocationTaskPages: './test/pages/waTaskTab.pages.js',
    caseLinkPages: './test/pages/caseLink.pages.js',
    caseFlagPages: './test/pages/caseFile.pages.js',
    globalSearchPages: './test/pages/globalsearch.pages.js',
  },
  bootstrap: null,
  mocha: {
    reporterEnabled: 'codeceptjs-cli-reporter, mochawesome',
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: false,
          steps: true,
        },
      },
      mochawesome: {
        stdout: './functional-output/e2e/console.log',
        options: {
          includeScreenshots: true,
          reportDir: './functional-output/e2e/reports',
          reportFilename: 'ET-XUI-E2E',
          inline: true,
          html: true,
          json: true,
        },
      },
    },
  },
  name: 'et-xui-e2e-tests',
  multiple: {
    chrome: {
      browsers: ['chrome'],
    },
    firefox: {
      browsers: ['firefox'],
    },
    safari: {
      browsers: ['safari'],
    },
    parallel: {
      chunks: 2,
      browsers: ['chrome', 'firefox', 'safari'],
    },
  },
  plugins: {
    stepByStepReport: {
      enabled: false,
      fullPageScreenshots: true,
      deleteSuccessful: false,
    },
    heal: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};