import { test, expect } from '@playwright/test';

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
        boxDelFail: '//div[@class="Message error noPrint"]',
        boxMessageSuccessInfo: '//div[@class="Message info noPrint"]',
    }
    const xpathSupplier = {
        menubarPurchases: '//a[@href="index.php?Application=PO"]',
        shipmentEntry: '//a[@href="/demo/SelectSupplier.php"]',
        searchSupplier: '//input[@name="Search"]',
        supplierID: '//input[@name="SupplierID"]',
        suppName: '//input[@name="SuppName"]',
        location1: '//input[@name="Address1"]',
        location2: '//input[@name="Address2"]',
        location3: '//input[@name="Address3"]',
        location4: '//input[@name="Address4"]',
        location5: '//input[@name="Address5"]',
        location6: '//select[@name="Address6"]',
        phone: '//input[@name="Phone"]',
        fax: '//input[@name="Fax"]',
        url: '//input[@name="URL"]',
        supplierType: '//select[@name="SupplierType"]',
        supplierSince: '//input[@name="SupplierSince"]',
        btnSubmit: '//input[@name="submit"]',
        boxMessageSuccess: '//div[@class="Message success noPrint"]',
        boxMessageFail: '//div[@class="Message error noPrint"]',
    }
    const dataAsset = {
        selectValue: 12, // giá trị cụ thể cần chọn, thay bằng giá trị thực tế
    }
    test.beforeEach(async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
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
    test('@DEL-001 - Delete Asset Success', async ({ page }) => {
        await page.locator(xpathAssetEdit.menuAssetManager).click();
        await test.step('Chọn asset cần chỉnh sửa', async () => {
            await page.locator(xpathAssetEdit.transactionsSelectAsset).click();
            await page.locator(xpathAssetEdit.assetBtnSearch).click();
        });
        await test.step('Xóa asset', async () => {
            await page.locator(`//input[@name="Select"]`).nth(3).click();
            await page.locator('//input[@name="delete"]').click();
            await page.waitForSelector(xpathAssetEdit.boxMessageSuccessInfo);
            await expect(page.locator(xpathAssetEdit.boxMessageSuccessInfo)).toHaveText(
                /INFORMATION Message\s*:\s*Deleted the asset\s*record/,
                { timeout: 10000 }
            );
        });
    });
    test('@DEL-002 - Delete Asset Fail', async ({ page }) => {
        await page.locator(xpathAssetEdit.menuAssetManager).click();
    
        await test.step('Chọn asset cần chỉnh sửa', async () => {
            await page.locator(xpathAssetEdit.transactionsSelectAsset).click();
            await page.locator(xpathAssetEdit.assetBtnSearch).click();
        });
    
        await test.step('Xóa asset', async () => {
            await page.locator(`//input[@name="Select"]`).nth(0).click();
            await page.locator('//input[@name="delete"]').click();
            await page.waitForSelector(xpathAssetEdit.boxDelFail);
            const errorMessage = await page.locator(xpathAssetEdit.boxDelFail).innerText();
            expect(errorMessage.trim()).toMatch(
                /ERROR Report\s*:\s*There is a purchase order set up for this asset. The purchase order line must be deleted first/
            );
        });
    });
    test('@DEL-003 - Delete Suppliers', async ({ page }) => {
        await test.step('Chọn Add Supplier Menu Bar', async () => {
            await page.locator(xpathSupplier.menubarPurchases).click();
            await page.locator(xpathSupplier.shipmentEntry).click();
            await page.locator(xpathSupplier.searchSupplier).click();
            await page.waitForSelector('//form[@action="/demo/SelectSupplier.php"]');
        })
        await test.step('Xóa supplier', async() => {
            await page.locator('//td[text()="ThoaiTest"]/preceding-sibling::td/input[@name="Select"]').nth(2).click();
            await page.waitForSelector('//p[@class="page_title_text"]');
            await page.locator('//td[@class="select"]/a').nth(14).click(); 
            await page.locator('//input[@name="delete"]').click();
        })
    });
})