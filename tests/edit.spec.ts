import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('EDIT - Edit Module', async () => {
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
    const xpathPersonalDetail = {
        displayRecordsMax: 'input[name="DisplayRecordsMax"]',
        displayPageHelp: '//select[@name="ShowPageHelp"]',
        displayFieldHelp: '//select[@name="ShowFieldHelp"]',
        language: '//select[@name="Language"]',
        theme: '//select[@name="Theme"]',
        pwd: '//input[@name="Password"]',
        confirmPwd: '//input[@name="PasswordCheck"]',
        email: '//input[@name="email"]',
        pdfLanguage: '//select[@name="PDFLanguage"]',
        btnModify: '//input[@name="Modify"]',
        boxMessage: '//div[@id="MessageContainerHead"]',
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
        boxMessageSucces: '//div[@class="Message success noPrint"]'
    }
    const xpathTender = {
        menubarPucharse: '//a[@href="index.php?Application=PO"]',
        editExistingTender: '//a[@href="/demo/SupplierTenderCreate.php?Edit=Yes"]',
        idTender: '//a[text() = "Edit"]',
        requireByDate: '//input[@name="RequiredByDate"]',
        location: '//select[@name="StkLocation"]',
        btnSupplier: '//input[@name="Suppliers"]',
        btnItems: '//input[@name="Items"]',
        tagNameSearchSupplier: '//legend[@class="search"]',
        tagNameSearchItems: '//legend[@class="search"]',
        btnSearchSupplier: '//input[@name="SearchSupplier"]',
        btnSearchItems: '//input[@name="Search"]',
        btnSelectSupplier: '//input[@name="SelectedSupplier"]',
        btnAddItems: '//input[@name="NewItem"]',
        qualityItems: '//input[@name="Qty0"]',
        btnSave: '//input[@name="Save"]',
        boxMessage: '//div[@class="Message success noPrint"]',
        btnCloseMessage: '//span[@class="MessageCloseButton"]'
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
    test('@EDIT-001 - Edit Personal Details', async ({ page }) => {
        await page.locator(xpathLogin.infoUser).click();
        await page.locator(xpathPersonalDetail.displayRecordsMax).fill('100');
        await page.locator(xpathPersonalDetail.language).selectOption('vi_VN.utf8');
        await page.locator(xpathPersonalDetail.theme).selectOption('professional');
        await page.locator(xpathPersonalDetail.email).fill('admin@weberp.org');
        await page.locator(xpathPersonalDetail.displayPageHelp).selectOption('1');
        await page.locator(xpathPersonalDetail.displayFieldHelp).selectOption('1');
        await page.locator(xpathPersonalDetail.pdfLanguage).selectOption('1');
        await page.locator(xpathPersonalDetail.btnModify).click();
        await page.waitForSelector(xpathPersonalDetail.boxMessage, { state: 'visible', timeout: 10000 });
        // Sử dụng toHaveText với regex để bỏ qua các khoảng trắng hoặc ký tự không mong muốn. Bạn có thể dùng biểu thức chính quy để đảm bảo chỉ có nội dung chính được kiểm tra
        await expect(page.locator(xpathPersonalDetail.boxMessage)).toHaveText(
            /SUCCESS Report\s*:\s*The user settings have been updated. Be sure to remember your password for the next time you login/,
            { timeout: 10000 }
        );
    });
    test('@EDIT-002 - Edit Personal Details Fail', async ({ page }) => {
        await page.locator(xpathLogin.infoUser).click();
        await page.locator(xpathPersonalDetail.displayRecordsMax).fill('100');
        await page.locator(xpathPersonalDetail.language).selectOption('vi_VN.utf8');
        await page.locator(xpathPersonalDetail.theme).selectOption('professional');
        await page.locator('//input[@name="Password"]').fill('123weberp');
        await page.locator('//input[@name="PasswordCheck"]').fill('123weberp');
        await page.locator(xpathPersonalDetail.email).fill('admin@weberp.org');
        await page.locator(xpathPersonalDetail.displayPageHelp).selectOption('1');
        await page.locator(xpathPersonalDetail.displayFieldHelp).selectOption('1');
        await page.locator(xpathPersonalDetail.pdfLanguage).selectOption('1');
        await page.locator(xpathPersonalDetail.btnModify).click();
        await page.waitForSelector(xpathPersonalDetail.boxMessage, { state: 'visible', timeout: 10000 });
        // Sử dụng toHaveText với regex để bỏ qua các khoảng trắng hoặc ký tự không mong muốn. Bạn có thể dùng biểu thức chính quy để đảm bảo chỉ có nội dung chính được kiểm tra
        await expect(page.locator(xpathPersonalDetail.boxMessage)).toHaveText(
            /WARNING Report\s*:\s*Cannot change password in the demo or others would be locked out!/,
            { timeout: 10000 }
        );
    });
    test('@EDIT-006 - Edit Asset Fail', async ({ page }) => {
        await page.locator(xpathAssetEdit.menuAssetManager).click();
        await test.step('Chọn asset cần chỉnh sửa', async () =>{
            await page.locator(xpathAssetEdit.transactionsSelectAsset).click();
            await page.locator(xpathAssetEdit.assetCategory).selectOption('test category');
            await page.locator(xpathAssetEdit.assetKeyword).fill('123');
            await page.locator(xpathAssetEdit.assetLocation).selectOption('Test location');
            await page.locator(xpathAssetEdit.assetBtnSearch).click();
            await page.locator(xpathAssetEdit.assetFormID).nth(0).isVisible();
            
        })
        await test.step('Chỉnh sửa asset', async () =>{
            await page.locator(xpathAssetEdit.assetCode).click();
            const imagePath = './tests/data-test/ImageTest.jpg';
            await page.setInputFiles('input[type="file"]', imagePath);
            await page.locator(xpathAssetEdit.assetUpdate).click();
            const messages = page.locator('//div[@class="Message warn noPrint"]');
            const count = await messages.count();
            for (let i = 0; i < count; i++) {
                const text = await messages.nth(i).innerText();
                if (text.includes('The file size is over the maximum allowed')) {
                    await expect(messages.nth(i)).toHaveText(
                        /WARNING Report\s*:\s*The file size is over the maximum allowed. The maximum size allowed in KB is 300/,
                        { timeout: 10000 }
                    );
                }
            }
        })
    });
    test('@EDIT-007 - Edit Asset Success', async ({ page }) => {
        await page.locator(xpathAssetEdit.menuAssetManager).click();
        await test.step('Chọn asset cần chỉnh sửa', async () =>{
            await page.locator(xpathAssetEdit.transactionsSelectAsset).click();
            await page.locator(xpathAssetEdit.assetCategory).selectOption('test category');
            await page.locator(xpathAssetEdit.assetKeyword).fill('123');
            await page.locator(xpathAssetEdit.assetLocation).selectOption('Test location');
            await page.locator(xpathAssetEdit.assetBtnSearch).click();
            await page.locator(xpathAssetEdit.assetFormID).nth(0).isVisible();
        })
        await test.step('Chỉnh sửa asset', async () =>{
            await page.locator(xpathAssetEdit.assetCode).click();
            const assetCode = await page.locator('//label[text()="Asset Code:"]/following-sibling::fieldtext').innerText();
            const imagePath = './tests/data-test/ImageTest2.jpg';
            await page.setInputFiles('input[type="file"]', imagePath);
            await page.locator(xpathAssetEdit.assetUpdate).click({timeout: 10000});
            await expect(page.locator(xpathAssetEdit.boxMessageSucces)).toHaveText(
                new RegExp(`SUCCESS Report\\s*:\\s*Asset ${assetCode} has been updated`),
                { timeout: 10000 }
            );
        })
    });
    test('@EDIT-008 - Change Location Asset Success', async ({ page }) => {
        await page.locator(xpathAssetEdit.menuAssetManager).click();
        await test.step('Chọn asset cần chỉnh sửa', async () =>{
            await page.locator('//a[@href="/demo/FixedAssetTransfer.php"]').click();
            await page.locator('//select[@name="AssetCat"]').selectOption('test category');
            await page.locator('//input[@name="Keywords"]').fill('123');
            await page.locator('//select[@name="AssetLocation"]').selectOption('Test location');
            await page.locator('//input[@name="Search" and @value="Search Now"]').click();
            await page.locator('//table[@class="selection"]').waitFor();
        })
        await test.step('Chỉnh sửa asset', async () =>{
            await page.locator('//select[@name="Location5"]').selectOption('Test location');
            await page.locator('//input[@name="Move5"]').click({timeout: 10000});
            await expect(page.locator('//div[@class="Message success noPrint"]')).toHaveText(
                new RegExp(`SUCCESS Report\\s*:\\s*The Fixed Asset has been moved successfully`),
                { timeout: 10000 }
            );
        })
    });
    // test('@EDIT-009 - Edit Existing Asset', async ({ page }) => {
    //     await page.locator(xpathTender.menubarPucharse).click();
    //     await page.locator(xpathTender.editExistingTender).click();
    //     await page.locator(xpathTender.idTender).nth(0).click();
    //     await test.step('Điền thông tin tender', async () =>{
    //         await page.locator(xpathTender.requireByDate).fill('2002-07-15');
    //     })
    //     await test.step('Chọn Supplier', async () => {
    //         await page.locator(xpathTender.btnSupplier).click();
    //         await page.waitForURL('**/SupplierTenderCreate.php?identifier=*', {
    //             timeout: 30000
    //         });
    //         expect(page.locator(xpathTender.tagNameSearchSupplier)).toHaveText('Supplier Search Criteria')
    //         await page.locator(xpathTender.btnSearchSupplier).click();
    //         await page.locator(xpathTender.btnSelectSupplier).nth(0).click();
    //     })
    //     await test.step('Chọn Items', async () => {
    //         await page.locator(xpathTender.btnItems).click();
    //         await page.waitForURL('**/SupplierTenderCreate.php?identifier=*', {
    //             timeout: 30000
    //         });
    //         expect(page.locator(xpathTender.tagNameSearchItems)).toHaveText('Item Search Criteria')
    //         await page.locator(xpathTender.btnSearchItems).click();
    //         await page.locator(xpathTender.qualityItems).fill('10');
    //         await page.locator(xpathTender.btnAddItems).click();
    //     })
    //     await test.step('Submit và kiểm tra', async () => {
    //         await page.locator(xpathTender.btnSave).click();
    //         await page.waitForSelector(xpathTender.btnCloseMessage, {timeout: 50000});
    //         expect(page.locator(xpathTender.boxMessage)).toHaveText(
    //             /SUCCESS Report\s*:\s*The tender has been successfully saved/,
    //             { timeout: 30000 }
    //         );
    //     })
    // });
})