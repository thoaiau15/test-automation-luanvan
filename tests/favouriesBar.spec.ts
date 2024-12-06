import { test, expect } from '@playwright/test';

test.describe('Favouries Bar', async () => {
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
    const favouritesBar = {
        favorBar: '//select[@id="favourites"]',
        accessMain: '//img[@title="Access Permissions Maintenance"]',
        titleAccess: 'webERP - Access Permissions Maintenance',
        paymentEntry: '//img[@title="Payment Entry"]',
        titlePayment: 'webERP - Claim Petty Cash Expenses From Tab'
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
    test('webERP - Access Permissions Maintenance', async ({ page }) => {
        await page.locator(favouritesBar.favorBar).nth(0).selectOption({ value: 'WWW_Access.php' });
        await page.waitForSelector(favouritesBar.accessMain);
        const pageTitle = await page.title();
        expect(pageTitle).toBe(favouritesBar.titleAccess); 
    });    
    test('webERP - Claim Petty Cash Expenses From Tab', async ({ page }) => {
        await page.locator(favouritesBar.favorBar).nth(0).selectOption({ value: 'PcClaimExpensesFromTab.php' });
        await page.waitForSelector(favouritesBar.paymentEntry);
        const pageTitle = await page.title();
        expect(pageTitle).toBe(favouritesBar.titlePayment); 
    });

})