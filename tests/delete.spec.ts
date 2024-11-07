import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('DEL - Delete Module', async () => {
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
        boxMessageSucces: '//div[@class="Message success noPrint"]',
        boxMessageSuccessInfo: '//div[@class="Message info noPrint"]',
    }
    const dataAsset = {
        selectValue: 8, // giá trị cụ thể cần chọn, thay bằng giá trị thực tế
    }
    test.beforeEach(async ({ page }) => {
        await page.goto("https://weberp.org/demo/index.php");
        await page.waitForSelector(xpathLogin.userLogin);
        await test.step('Fill username, password', async () => {
            await page.locator(xpathLogin.inputCompany).click();
            await page.waitForSelector('//span[text()="webERPDemo Company Ltd"]');
            await page.locator('//span[text()="webERPDemo Company Ltd"]').click();
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
    test('@DEL-001 - Edit Asset Success', async ({ page }) => {
        await page.locator(xpathAssetEdit.menuAssetManager).click();
        await test.step('Chọn asset cần chỉnh sửa', async () =>{
            await page.locator(xpathAssetEdit.transactionsSelectAsset).click();
            await page.locator(xpathAssetEdit.assetBtnSearch).click();
        })
        await test.step('Xóa asset', async () =>{
            page.on('dialog', dialog => dialog.accept());
            await page.locator(`//input[@name="Select" and @value="${dataAsset.selectValue}"]`).click();
            const assetCode = await page.locator('//label[text()="Asset Code:"]/following-sibling::fieldtext').innerText();
            await page.locator('//input[@name="delete"]').click();
            await page.waitForSelector(xpathAssetEdit.boxMessageSuccessInfo);
            await expect(page.locator(xpathAssetEdit.boxMessageSuccessInfo)).toHaveText(
                new RegExp(`INFORMATION Message\\s*:\\s*Deleted the asset  record for asset number ${assetCode}`, 's'),
                { timeout: 10000 }
              );
        })
    });
})