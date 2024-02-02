const chance = require('chance').Chance();
const firstName = chance.first();
const lastName = chance.last();
const emailAddress = firstName+'.'+lastName+'@mail.com';
module.exports = {
  TestUrl: process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net',
  TestUrlForManageCaseAAT: process.env.TEST_MANAGE_CASE_URL || 'https://manage-case.aat.platform.hmcts.net',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || false,
  TestsPathToRun: process.env.E2E_TEST_PATH || './**/*.js',
  TestReportFolder: process.env.E2E_OUTPUT_DIR || './functional-output/reports',
  TestEnvETClaimantFirstName: firstName,
  TestEnvETClaimantLastName: lastName,
  TestEnvETClaimantEmailAddress: emailAddress,
  TestEnvETPassword: process.env.TEST_CASE_PASSWORD || '',
  TestEnvETManageCaseUser: process.env.ET_CASEWORKER_USER_NAME || '',
  TestEnvETManageCasePassword: process.env.ET_CASEWORKER_PASSWORD || '',
  TestEnvETLegalRepUser: process.env.ET_LEGALREP_USER_NAME || '',
  TestEnvETLegalRepPassword: process.env.ET_LEGALREP_PASSWORD || '',
  TestEnvETCstcAdminUser: process.env.ET_CTSC_ADMIN_USER_NAME || '',
  TestEnvETCstcAdminPassword: process.env.ET_CTSC_ADMIN_PASSWORD || '',
};
