import { test, expect} from '@playwright/test';

test.describe('VIEW - View Data', async () => {
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
    test('@VIEW-001 - View Personal Details', async ({ page }) => {
        await page.locator(xpathLogin.infoUser).click();

        // Kiểm tra User ID
        const userIdText = await page.locator('fieldtext:has-text("admin")');
        await expect(userIdText).toBeVisible();
        console.log('User ID:', await userIdText.textContent());

        // Kiểm tra User Name
        const userNameText = await page.locator('fieldtext:has-text("Tim Schofield")');
        await expect(userNameText).toBeVisible();
        console.log('User Name:', await userNameText.textContent());
        
        // Kiểm tra Maximum Number of Records to Display
        const maxRecordsInput = page.locator('input[name="DisplayRecordsMax"]');
        await expect(maxRecordsInput).toBeVisible();
        const maxRecordsValue = await maxRecordsInput.inputValue();
        console.log('Maximum Number of Records to Display:', maxRecordsValue);

        // Kiểm tra Language
        const languageSelect = page.locator('select[name="Language"]');
        await expect(languageSelect).toBeVisible();
        const languageValue = await languageSelect.inputValue();
        console.log('Language:', languageValue);

        // Kiểm tra Theme
        const themeSelect = page.locator('select[name="Theme"]');
        await expect(themeSelect).toBeVisible();
        const themeValue = await themeSelect.inputValue();
        console.log('Theme:', themeValue);

        // Kiểm tra Email
        const emailInput = page.locator('input[name="email"]');
        await expect(emailInput).toBeVisible();
        const emailValue = await emailInput.inputValue();
        console.log('Email:', emailValue);

        // Kiểm tra Display Page Help
        const showPageHelpSelect = page.locator('select[name="ShowPageHelp"]');
        await expect(showPageHelpSelect).toBeVisible();
        const showPageHelpValue = await showPageHelpSelect.inputValue();
        
        // Lấy văn bản tương ứng với giá trị
        const showPageHelpText = await showPageHelpSelect.locator(`option[value="${showPageHelpValue}"]`).innerText();
        console.log('Display Page Help:', showPageHelpText );

        // Kiểm tra Display Field Help
        const showFieldHelpSelect = page.locator('select[name="ShowFieldHelp"]');
        await expect(showFieldHelpSelect).toBeVisible();
        const showFieldHelpValue = await showFieldHelpSelect.inputValue();
        
        // Lấy văn bản tương ứng với giá trị
        const showFieldHelpText = await showFieldHelpSelect.locator(`option[value="${showFieldHelpValue}"]`).innerText();
        console.log('Display Field Help:', showFieldHelpText);

        // Kiểm tra PDF Language Support
        const pdfLanguageSelect = page.locator('select[name="PDFLanguage"]');
        await expect(pdfLanguageSelect).toBeVisible();
        const selectedPdfLanguageValue = await pdfLanguageSelect.inputValue();
        const selectedPdfLanguageText = await pdfLanguageSelect.locator(`option[value="${selectedPdfLanguageValue}"]`).innerText();
        console.log('PDF Language Support:', selectedPdfLanguageText);
    });
})
