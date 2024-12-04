import { test, expect } from '@playwright/test';

test.describe('Fontend Login Page Test', async () => {
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
        logoLeft: '#login_logo .logo-left',
        logoRight: '#login_logo .logo-right',
        demoText: '#demo_text',
        dropList: '#dropdownlist .option',
        btnEys: 'input#eye'
    }
    test.beforeEach(async ({ page }) => {
        await page.goto("https://weberp.org/demo/index.php");
        await page.waitForSelector(xpathLogin.userLogin);
    });
    test.afterEach(async ({ page }) => {
        await page.close();
    });
    test('Verify logo display', async ({ page }) => {
        await expect(page.locator(xpathLogin.logoLeft)).toHaveText('web');
        await expect(page.locator(xpathLogin.logoLeft)).toBeVisible();
        await expect(page.locator(xpathLogin.logoRight)).toHaveText('ERP');
        await expect(page.locator(xpathLogin.logoRight)).toBeVisible();
    });
    test('Verify login form', async ({ page }) => {
        await expect(page.locator(xpathLogin.demoText)).toContainText('Login as user: admin');
        await expect(page.locator(xpathLogin.demoText)).toContainText('with password: weberp');
    });
    test('Verify company dropdown functionality', async ({ page }) => {
        await page.click(xpathLogin.inputCompany);
        await expect(page.locator(xpathLogin.dropList)).toHaveCount(2);
        const firstOption = page.locator(xpathLogin.dropList).nth(0);
        await expect(firstOption).toHaveText('webERPDemo Company Ltd');
        await expect(firstOption).toBeVisible();
    });
    test('Verify password visibility toggle', async ({ page }) => {
        await expect(page.locator(xpathLogin.userPass)).toHaveAttribute('type', 'password');
        await page.click(xpathLogin.btnEys);
        await expect(page.locator(xpathLogin.userPass)).toHaveAttribute('type', 'text');
    });
    
})