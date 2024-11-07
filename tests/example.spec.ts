import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

//const middleName = await page.inputValue('//form[@class="oxd-form"]/following::input[@name="firstName"]'); // Kiểm tra lại
        //     const lastName = await page.inputValue('.orangehrm-lastname');

        //     // Lấy thông tin nhân viên
        //     const employeeId = await page.inputValue('input[placeholder="Employee Id"]');
        //     const otherId = await page.inputValue('input[placeholder="Other Id"]');
        //     const driversLicense = await page.inputValue('input[placeholder="Driver\'s License Number"]');
        //     const licenseExpiryDate = await page.inputValue('input[placeholder="yyyy-dd-mm"]');
9
        //     // Lấy thông tin quốc tịch và tình trạng hôn nhân
        //     const nationality = await page.locator('.oxd-select-text--active').nth(0).innerText();
        //     const maritalStatus = await page.locator('.oxd-select-text--active').nth(1).innerText();

        //     // Lấy thông tin ngày sinh
        //     const dob = await page.inputValue('input[placeholder="yyyy-dd-mm"]');

        //     // Lấy giới tính
        //     const gender = await page.evaluate(() => {
        //         const checkedRadio = document.querySelector('input[type="radio"]:checked');
        //         return checkedRadio ? checkedRadio.nextElementSibling?.textContent : '';
        //     });

        //     // In ra thông tin đã lấy
        //     console.log('Thông tin cá nhân:');
        //     console.log(`Họ và Tên: ${firstName} ${middleName} ${lastName}`);
        //     console.log(`Mã Nhân Viên: ${employeeId}`);
        //     console.log(`Mã Khác: ${otherId}`);
        //     console.log(`Số Giấy Phép Lái Xe: ${driversLicense}`);
        //     console.log(`Ngày Hết Hạn Giấy Phép: ${licenseExpiryDate}`);
        //     console.log(`Quốc Tịch: ${nationality}`);
        //     console.log(`Tình Trạng Hôn Nhân: ${maritalStatus}`);
        //     console.log(`Ngày Sinh: ${dob}`);
        //     console.log(`Giới Tính: ${gender}`);
        // });