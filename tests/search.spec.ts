import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('SEARCH - Search Module', async () => {
    const userInfo = {
        username: "admin",
        password: "weberp"
    }
    const xpathLogin = {
        inputCompany: '//input[@id="CompanySelect"]',
        userLogin: '//input[@name="UserNameEntryField"]',
        userPass: '//input[@name="Password"]',
        wpSubmit: '//button[@type="submit" and @value="Login"]',
        loginError: '//b[text() = "incorrect password"]',
        infoUser: '//a[@href="/demo/UserSettings.php"]',
    }
    const xpathAssetEdit = {
        menuAssetManager: '//a[@href="index.php?Application=FA"]',
        transactionsSelectAsset: '//a[@href="/demo/SelectAsset.php"]',
        assetCategory: '//select[@name="AssetCategory"]',
        assetKeyword: '//input[@name="Keywords"]',
        assetLocation: '//select[@name="AssetLocation"]',
        assetBtnSearch: '//input[@name="Search"]',
        assetFormID: '//input[@name="FormID"]',
        assetCode: '//input[@name="Select"]',
        assetUpdate: '//input[@name="submit" and @value="Update"]',
        boxMessageFail: '//div[@class="Message warn noPrint"]',
        boxMessageSucces: '//div[@class="Message info noPrint"]'
    }
    test.beforeEach(async ({ page }) => {
        await page.goto("https://weberp.org/demo/index.php");
        await page.waitForSelector(xpathLogin.userLogin);
        await test.step('Fill username, password', async () => {
            await page.locator(xpathLogin.inputCompany).click();
            await page.waitForSelector('//span[text()="webERPDemo Company Ltd"]');
            await page.locator('//span[text()="webERPDemo Company Ltd"]').nth(0).click();
            await page.locator(xpathLogin.userLogin).fill(userInfo.username);
            await page.locator(xpathLogin.userPass).fill(userInfo.password);
        })
        await test.step('Click Submit button', async () => {
            await page.locator(xpathLogin.wpSubmit).click();
        })
        await test.step('Kiểm tra', async () => {
            await expect(page).toHaveURL(/demo\/index.php/);
        })
    });
    test.afterEach(async ({ page }) => {
        await page.close();
    });
    test('@SEARCH-001 - Search Asset Have In Data Success', async ({ page }) => {
        await page.locator(xpathAssetEdit.menuAssetManager).click();
        await test.step('Chọn asset cần chỉnh sửa', async () =>{
            await page.locator(xpathAssetEdit.transactionsSelectAsset).click();
            await page.locator(xpathAssetEdit.assetCategory).selectOption('test category');
            await page.locator(xpathAssetEdit.assetKeyword).fill('123');
            await page.locator(xpathAssetEdit.assetLocation).selectOption('Test location');
            await page.locator(xpathAssetEdit.assetBtnSearch).click();
            await page.locator(xpathAssetEdit.assetFormID).nth(0).isVisible();
        })
        await expect( page.locator(xpathAssetEdit.assetFormID).nth(0)).toBeHidden({timeout: 5000});
    });
    test('@SEARCH-002 - Search Asset No Have In Data Success', async ({ page }) => {
        await page.locator(xpathAssetEdit.menuAssetManager).click();
        await test.step('Chọn asset cần chỉnh sửa', async () =>{
            await page.locator(xpathAssetEdit.transactionsSelectAsset).click();
            await page.locator(xpathAssetEdit.assetCategory).selectOption('test category');
            await page.locator(xpathAssetEdit.assetKeyword).fill('1234');
            await page.locator(xpathAssetEdit.assetLocation).selectOption('Test location');
            await page.locator(xpathAssetEdit.assetBtnSearch).click();
        })
        await expect(page.locator(xpathAssetEdit.boxMessageSucces)).toHaveText(
            new RegExp(`INFORMATION Message\\s*:\\s*No assets were returned by this search please re-enter alternative criteria to try again`),
            { timeout: 10000 }
        );
    });
    test('@SEARCH-003 - Search All Asset Have In Data Success', async ({ page }) => {
        await page.locator(xpathAssetEdit.menuAssetManager).click();
        await test.step('Chọn asset cần chỉnh sửa', async () =>{
            await page.locator(xpathAssetEdit.transactionsSelectAsset).click();
            await page.locator(xpathAssetEdit.assetCategory).selectOption('test category');
            await page.locator(xpathAssetEdit.assetKeyword).fill(' ');
            await page.locator(xpathAssetEdit.assetLocation).selectOption('Test location');
            await page.locator(xpathAssetEdit.assetBtnSearch).click();
            await page.locator(xpathAssetEdit.assetFormID).nth(0).isVisible();
        })
        await expect( page.locator(xpathAssetEdit.assetFormID).nth(3)).toBeHidden({timeout: 5000});
    });
})