
import { ElementFinder, browser, by, element } from 'protractor';
import { BasePage } from './basepage';

export class LoginPage extends BasePage {
    private pageTitle: string;
    private emailInput: ElementFinder;
    private passwordInput: ElementFinder;
    private nextAndSubmitButton: ElementFinder;
    public url: string;

    constructor() {
        super();
        this.pageTitle = 'Sign in to your account';
        this.emailInput = element(by.css(`input[type=email]`));
        this.nextAndSubmitButton = element(by.css('input[type=submit]'));
        this.passwordInput = element(by.css(`input[type=password]`));      

        this.url = 'https://antongshortpoint.sharepoint.com/sites/HomeSite';
    };

    async open(): Promise<void> {
        await browser.get(this.url);
    };

    async isLoaded(): Promise<boolean> {
        await super.isLoaded(this.nextAndSubmitButton);
        return await super.pageTitleCompare(this.pageTitle);
    };

    async inputEmail(email: string): Promise<void> {
        await this.sendTextToElement(this.emailInput, email);
    };

    async inputPassword(pass): Promise<void> {
        await this.sendTextToElement(this.passwordInput, pass);
    };

    async clickNextOrSubmitButton(): Promise<void> {
        await this.clickElement(this.nextAndSubmitButton);
    };
}