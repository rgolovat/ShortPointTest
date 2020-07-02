
import { ElementFinder, browser, by, element, $, ElementArrayFinder, ExpectedConditions } from 'protractor';
import { BasePage } from './basepage';

export class TestTaskPage extends BasePage {
    private pageTitle: string;
    private slideshowLogo: ElementFinder;
    protected activeImagesCorousel: ElementArrayFinder;
    protected nextArrowOnCorousel: ElementFinder;
    public builderTile: ElementFinder;
    public demosLibraryTile: ElementFinder;
    public flipTyle: ElementFinder;
    public sleep: Function;

    constructor() {
        super();
        this.pageTitle = 'Test task - Home';
        this.slideshowLogo = element(by.xpath("//span[text()='Slideshow']"));
        this.activeImagesCorousel = element.all(by.xpath("//div[@aria-hidden='false' and @data-shortpoint]//img"));
        this.nextArrowOnCorousel = $('button.slick-next');
        this.sleep = (m: any) => new Promise(r => setTimeout(r, m));
        this.builderTile = element(by.xpath("//div[contains (@class, 'shortpoint-tile-style-sarah')]//div[@class='shortpoint-tile-title']"));
        this.demosLibraryTile = element(by.xpath("//div[contains (text(), 'Demos library')]/../.."));
        this.flipTyle = $('div[class*="shortpoint-tile-style-flip"]');
    };

    

    async isLoaded(): Promise<boolean> {
        await super.isLoaded(this.slideshowLogo);
        return await super.pageTitleCompare(this.pageTitle);
    };

    async getImagesNameInCorousel(): Promise<string[]> {
        const imageslinks: string[] = [];
        const activeImages = await this.activeImagesCorousel;
        for (let index = 0; index < activeImages.length; index++) {
            imageslinks.push( await activeImages[index].getAttribute('src'));
        }
        return imageslinks;
    }

    async clickOnNextArrowCorousel(): Promise<void>{
        const activeImages = await this.activeImagesCorousel;
        await super.hoverOnElement(activeImages[0]);
        await this.clickElement(this.nextArrowOnCorousel);
    }

    async getBuilderTileWidth(): Promise<string> {
        return await browser.executeScript("return window.getComputedStyle(arguments[0],':after').width", this.builderTile);
    };

    async getDemosLibraryTileTop(): Promise<string> {
        return await browser.executeScript("return window.getComputedStyle(arguments[0]).top", this.demosLibraryTile);
    };

    async hoverOnElement(element: ElementFinder): Promise<void> {
        super.hoverOnElement(element)
    }

    async isFlipTyleTextVisible(): Promise<boolean> {
        return await element(by.cssContainingText('*', 'Theme builder')).isPresent();
    }

}