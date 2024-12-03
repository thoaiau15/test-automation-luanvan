import { test, expect } from '@playwright/test';

test.describe('ADD - Add Module', async () => {
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
        infoUser: '//a[@href="/demo/UserSettings.php"]'
    }
    const xpathAddNewAsset = {
        menuAsset: '//a[@href="index.php?Application=FA"]',
        fixedAssetItems: '//a[@href="/demo/FixedAssetItems.php"]',
        description: '//input[@name="Description"]',
        longDescription: '//textarea[@name="LongDescription"]',
        assetCategory: '//select[@name="AssetCategoryID"]',
        assetLocation: '//select[@name="AssetLocation"]',
        barCode: '//input[@name="BarCode"]',
        serialNo: '//input[@name="SerialNo"]',
        depnType: '//select[@name="DepnType"]',
        depnRate: '//input[@name="DepnRate"]',
        btnInsert: '//input[@value="Insert New Fixed Asset"]',
        boxMessage: '//div[@class="Message success noPrint"]',
    }
    function generateRandomSupplierID() {
        // Tạo chuỗi ngẫu nhiên gồm 7 chữ số
        return Math.floor(1000000 + Math.random() * 9000000).toString();
    }
    const dataSupplier = {
        SupplierID: generateRandomSupplierID(),
        suppName: 'ThoaiTest',
        location1: 'Location1',
        location2: 'Location2',
        location3: 'Location3',
        location4: 'Location4',
        location5: 'Location5',
        location6: 'Viet Nam',
        numberPhone: '0123456789',
        numberFax: '+84 123456789 ',
        url: 'https://weberp.org/demo/Suppliers.php',
        supplierType: 'test',
        supplierSince: '2020-07-15',

    }
    const xpathSupplier = {
        menubarPurchases: '//a[@href="index.php?Application=PO"]',
        shipmentEntry: '//a[@href="/demo/SelectSupplier.php"]',
        addNewSupplier: '//a[@href="/demo/Suppliers.php"]',
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
    const dataTender = {
        requiredDate: '2002-07-15',
        location: 'Melbourne',
    }
    const xpathTender = {
        menubarPucharse: '//a[@href="index.php?Application=PO"]',
        createNewTender: '//a[@href="/demo/SupplierTenderCreate.php?New=Yes"]',
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
        btnCloseMessage:'//span[@class="MessageCloseButton"]'
    }
    test.beforeEach(async ({ page }) => {
        await page.goto("https://weberp.org/demo/index.php");
        await page.waitForSelector(xpathLogin.userLogin);
        await test.step('Fill username, password', async () => {
            await page.locator(xpathLogin.inputCompany).click();
            // Chờ cho các tùy chọn xuất hiện
            await page.waitForSelector('//span[text()="webERPDemo Company Ltd"]');
            // Nhấp vào tùy chọn cụ thể
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
    test('@ADD-001 - Add New A Asset', async ({ page }) => {
        await page.locator(xpathAddNewAsset.menuAsset).click();
        await page.locator(xpathAddNewAsset.fixedAssetItems).click();
        await page.locator(xpathAddNewAsset.description).fill('Test1');
        await page.locator(xpathAddNewAsset.longDescription).fill('Test1');
        await page.locator(xpathAddNewAsset.assetCategory).selectOption('test category');
        await page.locator(xpathAddNewAsset.assetLocation).selectOption('Test location');
        await page.locator(xpathAddNewAsset.barCode).fill('Test1');
        await page.locator(xpathAddNewAsset.serialNo).fill('Test1');
        await page.locator(xpathAddNewAsset.depnType).selectOption('Diminishing Value');
        await page.locator(xpathAddNewAsset.depnRate).fill('70');
        await page.locator(xpathAddNewAsset.btnInsert).click();
        await page.waitForSelector(xpathAddNewAsset.boxMessage, { state: 'visible', timeout: 10000 });
        // Sử dụng toHaveText với regex để bỏ qua các khoảng trắng hoặc ký tự không mong muốn. Bạn có thể dùng biểu thức chính quy để đảm bảo chỉ có nội dung chính được kiểm tra
        await expect(page.locator(xpathAddNewAsset.boxMessage)).toHaveText(
            /SUCCESS Report\s*:\s*The new asset has been added to the database with an asset code of:/,
            { timeout: 10000 }
        );
    });
    test('@ADD-002 - Create New A Tender', async ({ page }) => {
        await test.step('Chọn Add Tender Menu Bar', async () => {
            await page.locator(xpathTender.menubarPucharse).click();
            await page.locator(xpathTender.createNewTender).click();
        })
        await test.step('Điền thông tin', async () => {
            await page.locator(xpathTender.requireByDate).fill(dataTender.requiredDate); //YYYY-MM-DD
            await page.locator(xpathTender.location).selectOption(dataTender.location);
        })
        await test.step('Chọn Supplier', async () => {
            await page.locator(xpathTender.btnSupplier).click();
            await page.waitForURL('**/SupplierTenderCreate.php?identifier=*', {
                timeout: 30000
            });
            expect(page.locator(xpathTender.tagNameSearchSupplier)).toHaveText('Supplier Search Criteria')
            await page.locator(xpathTender.btnSearchSupplier).click();
            await page.locator(xpathTender.btnSelectSupplier).nth(0).click();
        })
        await test.step('Chọn Items', async () => {
            await page.locator(xpathTender.btnItems).click();
            await page.waitForURL('**/SupplierTenderCreate.php?identifier=*', {
                timeout: 30000
            });
            expect(page.locator(xpathTender.tagNameSearchItems)).toHaveText('Item Search Criteria')
            await page.locator(xpathTender.btnSearchItems).click();
            await page.locator(xpathTender.qualityItems).fill('10');
            await page.locator(xpathTender.btnAddItems).click();
        })
        await test.step('Submit và kiểm tra', async () => {
            await page.locator(xpathTender.btnSave).click();
            await page.waitForSelector(xpathTender.btnCloseMessage, { timeout: 60000 });
            await expect(page.locator(xpathTender.boxMessage)).toBeVisible({ timeout: 50000 });
            await expect(page.locator(xpathTender.boxMessage)).toHaveText(
                /SUCCESS Report\s*:\s*The tender has been successfully saved/,
                { timeout: 50000 }
            );
        })
    });
    test('@ADD-003 - Add New A Supplier Success', async ({ page }) => {
        await test.step('Chọn Add Supplier Menu Bar', async () => {
            await page.locator(xpathSupplier.menubarPurchases).click();
            await page.locator(xpathSupplier.shipmentEntry).click();
            await page.locator(xpathSupplier.addNewSupplier).click();
        })
        await test.step('Điền dữ liệu tạo mới', async () => {
            await page.locator(xpathSupplier.supplierID).fill(dataSupplier.SupplierID);
            await page.locator(xpathSupplier.suppName).fill(dataSupplier.suppName);
            await page.locator(xpathSupplier.location1).fill(dataSupplier.location1);
            await page.locator(xpathSupplier.location2).fill(dataSupplier.location2);
            await page.locator(xpathSupplier.location3).fill(dataSupplier.location3);
            await page.locator(xpathSupplier.location4).fill(dataSupplier.location4);
            await page.locator(xpathSupplier.location5).fill(dataSupplier.location5);
            await page.locator(xpathSupplier.location6).selectOption(dataSupplier.location6);
            await page.locator(xpathSupplier.phone).fill(dataSupplier.numberPhone);
            await page.locator(xpathSupplier.fax).fill(dataSupplier.numberFax);
            // await page.locator(xpathSupplier.url).fill(dataSupplier.url);
            //await page.locator(xpathSupplier.supplierType).selectOption(dataSupplier.supplierType);
            await page.locator(xpathSupplier.supplierSince).fill(dataSupplier.supplierSince); //YYYY-MM-DD
        })
        await test.step('Submit và kiểm tra', async () => {
            await page.locator(xpathSupplier.btnSubmit).click();
            await page.waitForSelector(xpathSupplier.boxMessageSuccess);
            await expect(page.locator(xpathSupplier.boxMessageSuccess)).toHaveText(
                new RegExp(`SUCCESS Report\\s*:\\s*A new supplier for ${dataSupplier.suppName} has been added to the database`),
                { timeout: 10000 }
            );
        })
    })
    test('@ADD-004 - Add New A Supplier Fail', async ({ page }) => {
        await test.step('Chọn Add Supplier Menu Bar', async () => {
            await page.locator(xpathSupplier.menubarPurchases).click();
            await page.locator(xpathSupplier.shipmentEntry).click();
            await page.locator(xpathSupplier.addNewSupplier).click();
        })
        await test.step('Điền dữ liệu tạo mới', async () => {
            await page.locator(xpathSupplier.supplierID).fill(dataSupplier.SupplierID);
            await page.locator(xpathSupplier.suppName).fill(dataSupplier.suppName);
            await page.locator(xpathSupplier.location1).fill(dataSupplier.location1);
            await page.locator(xpathSupplier.location2).fill(dataSupplier.location2);
            await page.locator(xpathSupplier.location3).fill(dataSupplier.location3);
            await page.locator(xpathSupplier.location4).fill(dataSupplier.location4);
            await page.locator(xpathSupplier.location5).fill(dataSupplier.location5);
            await page.locator(xpathSupplier.location6).selectOption(dataSupplier.location6);
            await page.locator(xpathSupplier.phone).fill(dataSupplier.numberPhone);
            await page.locator(xpathSupplier.fax).fill(dataSupplier.numberFax);
            // await page.locator(xpathSupplier.url).fill(dataSupplier.url);
            // await page.locator(xpathSupplier.supplierType).selectOption(dataSupplier.supplierType);
            await page.locator(xpathSupplier.supplierSince).fill(dataSupplier.supplierSince); //YYYY-MM-DD
        })
        await test.step('Submit và kiểm tra', async () => {
            await page.locator(xpathSupplier.btnSubmit).click();
            await page.waitForSelector(xpathSupplier.boxMessageFail, { timeout: 60000 });
            await expect(page.locator(xpathSupplier.boxMessageFail)).toHaveText(
                /ERROR Report\s*:\s*The supplier number already exists in the database/,
                { timeout: 30000 }
            );
        })
    })
})