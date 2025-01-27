import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { th } from "@faker-js/faker";


export default class CaseTransferPage extends BasePage {

  elements = {
    caseTransferReason:'#reasonForCT'
  }

async progressCaseTransfer(){
    await expect(this.page.locator(this.elements.caseTransferReason)).toBeVisible();
    await this.page.locator(this.elements.caseTransferReason).fill('Transfer case to Scotland RET');
    await this.clickContinue();
  }
  async checkYourAnswer(caseNumber){
    await expect(this.page.locator('ccd-case-edit-submit')).toContainText('Select the office you want to transfer the case to');
    await expect(this.page.locator('ccd-case-edit-submit')).toContainText('Reason for Case Transfer');
    await this.page.getByRole('button', { name: 'Transfer Case' }).click();
    await expect(this.page.locator('#case-viewer-field-read--positionType')).toContainText('Case transferred - other country');
    await expect(this.page.locator('h4')).toContainText('Case Status: Transferred');
    await this.page.reload();
    try {
      // Check if the element is visible
      const isVisible = await this.page.getByRole('link', { name: '/2025' }).isVisible();

      if (!isVisible) {
        // Click the button if the element is not visible
        await this.page.reload();
      }
    } catch (error) {
      console.error('Scotland Case Transfer link not visible', error);
    }
    await expect(this.page.getByLabel('Case Details').getByRole('paragraph')).toContainText('Case Transfer: Transferred to Glasgow ' +caseNumber);
    await expect(this.page.getByRole('link', { name: '/2025' })).toBeVisible();
    await this.page.getByRole('link', { name: '/2025' }).click();
    const page1Promise = this.page.waitForEvent('popup');
    const page1 = await page1Promise;
    await page1.reload();
    await expect(page1.locator('#case-viewer-field-read--managingOffice')).toContainText('Glasgow');

  }
}
