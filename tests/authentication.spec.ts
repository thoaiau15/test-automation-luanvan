import { test, expect} from '@playwright/test';
test.describe('AUTH - Authentication', async () => {
    const userInfo = {
        username: "admin",
        password: "weberp",
        usernameFail: "Aadmin",
        passwordFail: "admin1234",
    }
    const xpath = {
        inputCompany: '//input[@id="CompanySelect"]',
        userLogin: '//input[@name="UserNameEntryField"]',
        userPass: '//input[@name="Password"]',
        wpSubmit: '//button[@type="submit" and @value="Login"]',
        loginError: '//b[text() = "incorrect password"]'
    }
    test.beforeEach(async ({ page }) => {
        await page.goto("https://weberp.org/demo/index.php");
        await page.waitForSelector(xpath.userLogin);
    });
    test.afterEach(async ({ page }) => {
        await page.close();
    });
    test('@AUTH_001 - Login Success', async ({ page }) => {
        await test.step('Điền thông tin', async () => {
            await page.locator(xpath.inputCompany).click();
            await page.waitForSelector('//span[text()="webERPDemo Company Ltd"]');
            await page.locator('//span[text()="webERPDemo Company Ltd"]').nth(0).click();
            await page.locator(xpath.userLogin).fill(userInfo.username);
            await page.locator(xpath.userPass).fill(userInfo.password);
        })
        await test.step('Click Submit button', async () => {
            await page.locator(xpath.wpSubmit).click();
        })
        await test.step('Kiểm tra', async () => {
            await expect(page).toHaveURL(/demo\/index.php/);
        })
    });
    test('@AUTH_002 - Login Fail', async ({ page }) => {
        await test.step('Điền thông tin', async () => {
            await page.locator(xpath.inputCompany).click();
            await page.waitForSelector('//span[text()="webERPDemo Company Ltd"]');
            await page.locator('//span[text()="webERPDemo Company Ltd"]').nth(0).click();
            await page.locator(xpath.userLogin).fill(userInfo.username);
            await page.locator(xpath.userPass).fill(userInfo.passwordFail);
        })
        await test.step('Click Submit button', async () => {
            await page.locator(xpath.wpSubmit).click();
        })
        await test.step('Kiểm tra', async () => {
            const errorMessageLocator = page.locator(xpath.loginError);
            await expect(errorMessageLocator).toBeVisible();
        })
    });
    test('@AUTH_003 - Login Fail', async ({ page }) => {
        await test.step('Điền thông tin', async () => {
            await page.locator(xpath.inputCompany).click();
            await page.waitForSelector('//span[text()="webERPDemo Company Ltd"]');
            await page.locator('//span[text()="webERPDemo Company Ltd"]').nth(0).click();
            await page.locator(xpath.userLogin).fill(userInfo.usernameFail);
            await page.locator(xpath.userPass).fill(userInfo.password);
        })
        await test.step('Click Submit button', async () => {
            await page.locator(xpath.wpSubmit).click();
        })
        await test.step('Kiểm tra', async () => {
            const errorMessageLocator = page.locator(xpath.loginError);
            await expect(errorMessageLocator).toBeVisible();
        })
    });
    test('@AUTH_004 - Login Fail', async ({ page }) => {
        await test.step('Điền thông tin', async () => {
            await page.locator(xpath.inputCompany).click();
            await page.waitForSelector('//span[text()="webERPDemo Company Ltd"]');
            await page.locator('//span[text()="webERPDemo Company Ltd"]').nth(0).click();
            await page.locator(xpath.userLogin).fill(userInfo.usernameFail);
            await page.locator(xpath.userPass).fill(userInfo.passwordFail);
        })
        await test.step('Click Submit button', async () => {
            await page.locator(xpath.wpSubmit).click();
        })
        await test.step('Kiểm tra', async () => {
            const errorMessageLocator = page.locator(xpath.loginError);
            await expect(errorMessageLocator).toBeVisible();
        })
    });
})
