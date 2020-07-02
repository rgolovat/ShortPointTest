import { browser, ExpectedConditions, ElementFinder } from 'protractor';

export class BasePage {
    protected defaultTimeout: number;

    constructor() {
        this.defaultTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    }

    protected async isLoaded(element: ElementFinder): Promise<boolean> {
        await this.waitForElementVisibility(element);
        return await element.isDisplayed();
    };

    protected async pageTitleCompare(pageTitle: string): Promise<boolean> {
        const title = await this.getPageTitle();
        return title === pageTitle;
    };

    protected async waitForElementVisibility(element: ElementFinder): Promise<void> {
        await browser.wait(ExpectedConditions.visibilityOf(element), this.defaultTimeout);
    };

    async getCurrentUrl(): Promise<string> {
        return await browser.getCurrentUrl();
    };

    protected async getPageTitle(): Promise<string>{
        return await browser.getTitle();
    };

    protected async sendTextToElement(element: ElementFinder, text: string): Promise<void> {
        await this.waitForElementVisibility(element);
        await element.sendKeys(text);
    };

    protected async scrollTo(element: ElementFinder): Promise<void> {
        await browser.executeScript('arguments[0].scrollIntoView()', element.getWebElement());
    };

    protected async clickElement(element: ElementFinder): Promise<void> {
        await this.waitForElementVisibility(element);
        await element.click();
    }

    protected async hoverOnElement(element: ElementFinder): Promise<void> {
        await browser.actions().mouseMove(element).perform();
    }
}