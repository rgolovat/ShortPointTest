import { browser} from 'protractor';
import { LoginPage } from '../pages/login.page';
import { HomeSitePage } from '../pages/homesite.page';
import { TestTaskPage } from '../pages/testtask.page';


const loginPage = new LoginPage();
const homesitePage = new HomeSitePage();
const testtaskPage = new TestTaskPage();

describe('ShortPoint tests', function () {
    const credentials = { username: 'sptestautomation@antongshortpoint.onmicrosoft.com', password: 'Testautomation1' }
    it('Navigation between sites works properly', async () => {
        await loginPage.open();
        expect(await loginPage.isLoaded()).toBeTruthy('Login page should be loaded');
        await loginPage.inputEmail(credentials.username);
        await loginPage.clickNextOrSubmitButton();
        await loginPage.inputPassword(credentials.password);
        await loginPage.clickNextOrSubmitButton();
        await loginPage.clickNextOrSubmitButton();
        
        expect(await homesitePage.isLoaded()).toBeTruthy('Home site page should be loaded')
        await homesitePage.clickStartButton();

        const windows = await browser.getAllWindowHandles();
        await browser.switchTo().window(windows[1]);
        expect(await testtaskPage.isLoaded()).toBeTruthy('Test site page should be loaded');            
    });

    it('Slideshow (animation) is working', async() => {
        let images = await testtaskPage.getImagesNameInCorousel();
        expect(images[0].includes('1.png')).toBeTruthy('1.png shown in corousel');
        expect(images[1].includes('2.png')).toBeTruthy('2.png shown in corousel');
        expect(images[2].includes('3.png')).toBeTruthy('3.png shown in corousel');
        await testtaskPage.clickOnNextArrowCorousel()

        images = await testtaskPage.getImagesNameInCorousel();
        expect(images[0].includes('2.png')).toBeTruthy('2.png shown in corousel');
        expect(images[1].includes('3.png')).toBeTruthy('3.png shown in corousel');
        expect(images[2].includes('4.png')).toBeTruthy('4.png shown in corousel');
    });

    it('Verify that hover effects for each Tile are animated', async() => {
        const widthBefore = await testtaskPage.getBuilderTileWidth()
        await testtaskPage.hoverOnElement(testtaskPage.builderTile);
        await testtaskPage.sleep(2000);
        const widthAfter = await testtaskPage.getBuilderTileWidth()
        expect(widthBefore < widthAfter).toBeTruthy('PageBuilder animation is present');

        const topBefore = await testtaskPage.getDemosLibraryTileTop()
        await testtaskPage.hoverOnElement(testtaskPage.demosLibraryTile);
        await testtaskPage.sleep(2000);
        const topAfter = await testtaskPage.getDemosLibraryTileTop()
        expect(topBefore > topAfter).toBeTruthy('Demos Library Tile animation is present');

        expect(testtaskPage.isFlipTyleTextVisible()).toBeFalsy('Flip tyle text is not visible');
        await testtaskPage.hoverOnElement(testtaskPage.flipTyle);
        await testtaskPage.sleep(2000);
        expect(testtaskPage.isFlipTyleTextVisible()).toBeTruthy('Flip tyle text is visible, animation is present');
    });
    
});