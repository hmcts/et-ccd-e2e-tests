const { I } = inject();
const testConfig = require('../../config');
module.exports = {
  caseListText: 'Case list',
  caseListLink: '[href="/cases"]',
  hideFilterButton: '[class="govuk-button hmcts-button--secondary"]',
  jurisdictionDropdown: '#wb-jurisdiction',
  caseTypeDropdown: '#wb-case-type',
  stateDropdown: '#wb-case-state',
  tribunalOffice: '#managingOffice',
  caseNumberInputField: '#ethosCaseReference',
  receiptDateDay: '#receiptDate-day',
  receiptDateMonth: '#receiptDate-month',
  receiptDateYear: '#receiptDate-year',
  submissionReferenceLocator: '#feeGroupReference',
  respondentTextfield: '#respondent',
  applyButton: '[aria-label="Apply filter"]',
  resetButton: '[aria-label="Reset filter"]',
  nextEventDropdown: '#next-step',
  submitEventButton: '[type="submit"]',
  tab: '[role="tab"] div:contains("Applications")',
  //.hmcts-primary-navigation__item:nth-child(1) > .hmcts-primary-navigation__link
  myWorkLink: '//a[contains(.,"My work")]',
  myTaskTab: '[aria-current="page"]',
  availableTaskTab: '[href="/work/my-work/available"]',
  myCasesTab: '[href="/work/my-work/my-cases"]',
  accessTab: '[href="/work/my-work/my-access"]',
  availableTaskRows: 'tbody > tr:nth-of-type(1)',
  allWorkTab: '[href="/work/all-work/tasks"]',
  taskTabAllWork: '[aria-current="page"]',
  selectAllLocationAllWork: '#radio_location_all',
  searchTaskBySpecificPerson: '[id="radio_Specific person"]]',
  searchTaskByAll: '#radio_All',
  searchTaskByUnassigned: '[id="radio_None / Available tasks"]',
  enterWAOfficerName: '#inputSelectPerson',
  enterTaskName: '#inputSelectTaskName',
  applyFilterButton: '#applyFilter',
  taskByRoleType: '#select_taskType',
  et1Vetting : '//*[@id="mat-option-0"]/span',
  linkedCasesTab: '[aria-posinset="11"] > .mat-tab-label-content',

  searchCaseApplication(option) {
    I.waitForElement(this.caseTypeDropdown, 30);
    I.see(this.caseListText);
    I.waitForElement(this.caseTypeDropdown, 30);
    I.selectOption(this.caseTypeDropdown, option);
    I.click(this.applyButton);
  },

  searchCaseApplicationWithSubmissionReference(option, submissionReference) {
    I.waitForElement(this.caseListLink, 30);
    I.click(this.caseListLink);
    I.waitForElement(this.caseTypeDropdown, 30);
    I.refreshPage();
    I.wait(5);
    I.waitForElement(this.caseTypeDropdown, 55);
    I.see(this.caseListText);
    I.wait(5);
    try {
      switch (option) {
        case 'Eng/Wales - Singles':
          I.selectOption(this.caseTypeDropdown, 'Eng/Wales - Singles');
          break;
        case 'Scotland - Singles':
          I.selectOption(this.caseTypeDropdown, 'Scotland - Singles (RET)');
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    I.scrollPageToBottom();
    I.waitForVisible(this.submissionReferenceLocator, 10);
    I.click(this.submissionReferenceLocator);
    I.fillField(this.submissionReferenceLocator, submissionReference);
    I.wait(3);
    I.forceClick(this.applyButton);
  },

  processCaseFromCaseList(submissionReference) {
    I.waitForElement('#search-result-heading__text', 30);
    let text = `/cases/case-details/${submissionReference}`;
    let caseNumber = I.grabTextFrom(`[href="${text}"]`);
    console.log('case number is' + caseNumber);
    I.click(`[href="${text}"]`);
    return caseNumber;
  },

  selectNextEvent(option) {
    I.waitForEnabled(this.nextEventDropdown, 60);
    I.selectOption(this.nextEventDropdown, option);
    I.wait(5);
    I.forceClick(this.submitEventButton);
  },

  selectTab(title) {
    I.wait(5);
    I.waitForClickable(`//div[@role='tab']/div[contains(text(), '${title}')]`, 30);
    I.forceClick(`//div[@role='tab']/div[contains(text(), '${title}')]`);
  },

  navigateToMakeAnApplication(submissionReference) {
    let makeAnApplicationLink = `/cases/case-details/${submissionReference}/trigger/respondentTSE/respondentTSE1`;
    I.wait(10);
    I.forceClick(`[href="${makeAnApplicationLink}"]`);
  },

  verifyCaseDetailsPage(et1VettingFlag = false) {
    I.waitForElement('[tabindex="0"]', 30);
    I.see('Claimant');
    I.see('Respondent');
    I.see('Jurisdictions');
    I.see('Referrals');
    I.see('History');
    I.see('Documents');
    if (et1VettingFlag) {
      I.see('ET1Vetting');
    }
  },
  proceedtoWATaskPage() {
    //I.waitForElement(this.resetButton, 20);
    I.seeElement(this.myWorkLink);
    I.click(this.myWorkLink);
    I.waitForElement(this.myCasesTab, 10);
    I.seeElement(this.availableTaskTab);
    I.seeElement(this.myCasesTab);
    I.seeElement(this.accessTab);
  },

  proceedToAvailableTask() {
    I.click(this.availableTaskTab);
    I.seeElement(this.availableTaskRows);
  },

  searchTaskFromAllWorkAllLocation(taskTypeOption, taskByRole, taskName, submissionReference, taskVisible) {
    I.waitForElement(this.allWorkTab, 20);
    I.click(this.allWorkTab);
    I.waitForElement(this.taskTabAllWork, 10);
    I.scrollPageToBottom();
    I.see('View and manage all tasks and cases.');
    switch (taskTypeOption) {
      case 'All':
        I.checkOption(this.searchTaskByAll);
        break;
      case 'Unassigned':
        I.checkOption(this.searchTaskByUnassigned);
        break;
      case 'Assigned to a person':
        I.checkOption(this.searchTaskBySpecificPerson);
        I.fillField(this.enterWAOfficerName, 'Lefity');
        // provide a name
        break;
      default:
        throw new Error('... check your options or add new option');
    }
    I.selectOption(this.taskByRoleType, taskByRole);
    I.fillField(this.enterTaskName, taskName);
    I.click(this.et1Vetting);
    // possibly needed more time for the case to pop up on the ui
    I.wait(15);
    I.forceClick(this.applyFilterButton);
    I.wait(5);

    let newlyCreatedTask =
      testConfig.TestUrlForManageCaseAAT + '/cases/case-details/' + submissionReference + '/tasks';
    console.log('WA link is visible under All work tab: ' +newlyCreatedTask);
    if (taskVisible) {
     (newlyCreatedTask).includes(submissionReference);
        I.amOnPage(newlyCreatedTask);

    } else {
      I.dontSee(newlyCreatedTask);
      console.log('WA link is not visible under All work tab');
    }
  },

  verifiedLinkedCasesFromCaseLinkTab(submissionReference) {
    I.waitForElement(this.linkedCasesTab, 20);
    I.click(this.linkedCasesTab);
    let el = `[href="cases/case-details/${submissionReference}"]`;
    I.seeElement(el);
  },
};
