import { test, expect } from '@playwright/test';

test.describe('Header Bar', async () => {
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
    const xpathReturnMenu = {
        userSetting: '//a[@href="/demo/UserSettings.php"]',
        formActionUser: '//form[@action="/demo/UserSettings.php"]',
        btnReturn: '//a[@data-title="Return to the main menu"]',
        urlMenu: 'https:/weberp.org/demo/index.php'
    }
    const xpathUserSet = {
        userSetting: '//a[@href="/demo/UserSettings.php"]',
        formActionUser: '//form[@action="/demo/UserSettings.php"]',
        urlUserSet: 'https://weberp.org/demo/UserSettings.php'
    }
    const xpathShowDash = {
        dashboard: '//a[@href="/demo/Dashboard.php"]',
        report: '//select[@name="Reports"]',
        urlDash: 'https://weberp.org/demo/Dashboard.php'
    }
    const xpathReadMenu = {
        manualContent: '//a[@href="/demo/ManualContents.php"]',
        urlManual: 'https://weberp.org/demo/ManualContents.php',
        titleH1: '//h1[text()="Table of Contents"]'
    }
    const btnLog = {
        btnLogout: '//a[@href="/demo/Logout.php"]',
        demoText: '//div[@id="demo_text"]',
        urlLog: 'https://weberp.org/demo/index.php',
    }
    const xpathTheme = {
        theme: '//select[@name="Theme"]',
        themSilver: '//link[@href="/demo/css/silverwolf/styles.css?version=1.0"]',
        themWeb: '//link[@href="/demo/css/WEBootstrap/styles.css?version=1.0"]',
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
    test('User Profile', async ({ page }) => {
        await page.locator(xpathUserSet.userSetting).click();
        await page.waitForSelector(xpathUserSet.formActionUser);
        await expect(page).toHaveURL(xpathUserSet.urlUserSet);
    });    
    test('Return to main menu', async ({ page }) => {
        await page.locator(xpathReturnMenu.userSetting).click();
        await page.waitForSelector(xpathReturnMenu.formActionUser);
        await page.locator(xpathReturnMenu.btnReturn).click();
        await expect(page).toHaveURL(xpathReturnMenu.urlMenu);
    });
    test('Show Dashboard', async ({ page }) => {
        await page.locator(xpathShowDash.dashboard).click();
        await page.waitForSelector(xpathShowDash.report);
        await expect(page).toHaveURL(xpathShowDash.urlDash);
    });
    test('Read the Manual', async ({ page, context }) => {
        const [newTab] = await Promise.all([
            context.waitForEvent('page'), 
            page.locator(xpathReadMenu.manualContent).click(), 
        ]);
        await newTab.waitForLoadState();
        expect(newTab.url()).toBe(xpathReadMenu.urlManual);
        const heading = newTab.locator(xpathReadMenu.titleH1);
        await expect(heading).toBeVisible();
    });
    test('Button Logout Click Success', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await page.locator(btnLog.btnLogout).click();
        await page.waitForSelector(btnLog.demoText);
        await expect(page).toHaveURL(btnLog.urlLog);
    });
    test('Button Logout Click Fail', async ({ page }) => {
        page.on('dialog', dialog => dialog.dismiss());
        await page.locator(btnLog.btnLogout).click();
        await expect(page).toHaveURL(btnLog.urlLog);
    });
    test('Select Theme Silverwolf', async ({ page }) => {
        await page.waitForLoadState('load');
        await page.locator(xpathTheme.theme).selectOption({ value: "silverwolf" });
        await page.waitForTimeout(1000); 
        const link = page.locator(xpathTheme.themSilver);
        await expect(link).toHaveAttribute('href', "/demo/css/silverwolf/styles.css?version=1.0");
    });
    test('Select Theme WEBootstrap', async ({ page }) => {
        await page.waitForLoadState('load');
        await page.locator(xpathTheme.theme).selectOption({ value: "WEBootstrap" });
        await page.waitForTimeout(1000); 
        const link = page.locator(xpathTheme.themWeb);
        await expect(link).toHaveAttribute('href', "/demo/css/WEBootstrap/styles.css?version=1.0");
    });
})