
import { ElementFinder, by, element } from 'protractor';
import { BasePage } from './basepage';

export class HomeSitePage extends BasePage {
    private pageTitle: string;
    private startButton: ElementFinder;

    constructor() {
        super();
        this.pageTitle = 'Home Site - Home';
        this.startButton = element(by.xpath("//a[text()='Start']"));   
    };

    
    async isLoaded(): Promise<boolean> {
        await super.isLoaded(this.startButton);
        return await super.pageTitleCompare(this.pageTitle);
    };

    async clickStartButton(): Promise<void> {
        await this.clickElement(this.startButton);
    };
  
}