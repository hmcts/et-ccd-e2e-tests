const testConfig = require('../../../config.js');
const postcode = 'FK15 9ET';
const addressOption = '3e, Station Road, Dunblane, FK15 9ET';
const workPostcode = 'EH45 9BU';
const selectedWorkAddress = 'Unit 4, Cherry Court, Cavalry Park, Peebles, EH45 9BU';
const firstLineOfAddress = 'Unit 4, Cherry Court, Cavalry Park';

Feature('End To End; Work Allocation - Submit a Referral ');
Scenario(
  'Submit a case from Scotland - Case Admin Submit',
  async ({
    I,
    basePage,
    loginPage,
    taskListPage,
    personalDetailsPage,
    employmentAndRespondentDetailsPage,
    claimDetailsPage,
    submitClaimPage,
    caseListPage,
    et1CaseVettingPages,
    et1CaseServingPages,
    respondentRepresentativePage,
    referralPages,
    workAllocationTaskPages,
  }) => {
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLoginWithNewAccount();
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'Scotland', addressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    I.click('Sign out');
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETCstcAdminUser, testConfig.TestEnvETCstcAdminPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    //assign the task
    await caseListPage.selectTab('Tasks');
    await workAllocationTaskPages.clickAssignToMeLink();
    await caseListPage.proceedtoWATaskPage();
    await caseListPage.proceedToAvailableTask();
    await caseListPage.searchTaskFromAllWorkAllLocation('All', 'All', 'Et1 Vetting', submissionReference, true);
    await workAllocationTaskPages.verifyWAtaskTabPage(submissionReference);
    // vet the case
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //accept the case
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    //add org to case to enable cui applications
    await caseListPage.selectNextEvent('Respondent Representative'); //Respondent Representative Event
    await respondentRepresentativePage.addRespondentRepresentative('registered', 'ET Test3 Organisation');
    //do referral as to a judge
    await referralPages.submitAreferral('et.ctscworker010@justice.gov.uk', 'Admin', 'Test Referral by Admin', 'Yes', 1);
  },
).tag('@nightly');
