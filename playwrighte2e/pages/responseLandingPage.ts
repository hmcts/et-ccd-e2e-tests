import {BasePage} from "./basePage";
import { expect, Page } from '@playwright/test';

export default class ResponseLandingPage extends BasePage {

    protected constructor(page: Page) {
        super(page);
    }

    public static create(page: Page): ResponseLandingPage {
        return new ResponseLandingPage(page);
    }

    async startEt3() {
        await expect(this.page.locator('#main-content')).toContainText('Case overview');
        await this.page.getByRole('link', {name: 'Your response form (ET3)'}).click();
        await expect(this.page.getByRole('heading')).toContainText('Response to ET1 employment tribunal claim (ET3)');
        await this.clickStartNow();
    }

}
