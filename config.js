module.exports = {
  TestUrl: process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net',
  TestUrlForManageCaseAAT: process.env.TEST_MANAGE_CASE_URL || 'https://manage-case.aat.platform.hmcts.net',
  TestIdamUrl: process.env.IDAM_URL || 'https://idam-api.aat.platform.hmcts.net/testing-support/accounts',
  IdamAcccountUrl: process.env.IDAM_ACCOUNT_URL || 'https://idam-api.aat.platform.hmcts.net/testing-support/accounts',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || false,
  TestsPathToRun: process.env.E2E_TEST_PATH || './**/*.js',
  TestReportFolder: process.env.E2E_OUTPUT_DIR || './functional-output/reports',
  TestEnvETClaimantEmailAddress: '',
  TestApiKey : process.env.API_KEY || '',
  TestEnvETCaseWorkerUser: process.env.TEST_CASE_USER_NAME || '',
  TestEnvETPassword: process.env.TEST_CASE_PASSWORD || '',
  TestEnvETManageCaseUser: process.env.ET_LEGAL_OPS_USER_NAME || '',
  TestEnvETManageCasePassword: process.env.ET_LEGAL_OPS_PASSWORD || '',
  TestEnvETLegalRepUser: process.env.ET_LEGALREP_USER_NAME || '',
  TestEnvETLegalRepPassword: process.env.ET_LEGALREP_PASSWORD || '',
  TestEnvETLegalOpsUser: process.env.ET_CTSC_ADMIN_USER_NAME || '',
  TestEnvETHearingJudgeUserScot: process.env.ET_HEARING_JUDGE_USER_NAME_SCOT || '',
  TestEnvETHearingJudgeUserEng: process.env.ET_HEARING_JUDGE_USER_NAME_ENG || '',
  TestEnvETAdminUserEng: process.env.ET_HEARING_ADMIN_USER_NAME_ENG || '',
  TestEnvETAdminUserScot: process.env.ET_HEARING_ADMIN_USER_NAME_SCOT || '',
};
