import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://alpha.pprbd.org/');

  //Sign-in
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('akerkei@pprbd.org');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Temp@2023!!!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('https://alpha.pprbd.org/Account/Admin');

  //Impersonate a contractor
  await page.goto('https://alpha.pprbd.org/');
  await page.getByRole('combobox', { name: 'Run As:' }).click();
  await page.getByRole('combobox', { name: 'Run As:' }).fill('rbdtest');
  await page.locator('#RunAsGoButton').click();

  //Click on Pull New Permit
 
  await page.getByRole('link', { name: 'Pull New Permit' }).click();
  await page.getByLabel('Department', { exact: true }).selectOption('Building');
  await page.getByLabel('New or Attach?').selectOption('New Permit');
  await page.getByLabel('Address Type').selectOption('434');
  await page.getByRole('textbox', { name: 'Project Valuation' }).click();
  await page.getByRole('textbox', { name: 'Project Valuation' }).fill('2000');
  await page.locator('#useProjectInfo').click();
  await page.getByRole('spinbutton', { name: 'Street #' }).click();
  await page.getByRole('spinbutton', { name: 'Street #' }).fill('7358');
  await page.getByRole('spinbutton', { name: 'Street #' }).press('Tab');
  await page.getByRole('textbox', { name: 'Street Name' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Street Name' }).type('rim bluff', { delay: 100 });
  await page.waitForTimeout(4000);
  await page.getByRole('textbox', { name: 'Street Name' }).press('Enter');
  await page.waitForTimeout(5000);
  await page.locator('#addressRow').getByText('Continue', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Owner Ph. #:' }).click();
  await page.getByRole('textbox', { name: 'Owner Ph. #:' }).fill('7197992860');
  await page.getByLabel('Standard Projects:').selectOption('STUCCO');
  await page.getByText('Add Permit to Cart').click();
  await page.getByText('Continue to Checkout',{ exact: true }).click();
 
  //Cancel the permit in the cart
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('button', { name: 'Yes, Cancel This Item' }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'ok' }).click();
 
  //Stop btn

  await page.getByRole('button', { name: 'Stop' }).click();

  //Sign out btn
 
   const signOutLink = page.getByRole('link', { name: 'Sign Out' });
  
  // Assert that the link is visible and then click it.
  await expect(signOutLink).toBeVisible();
  await signOutLink.click();

  //Browser close
  await page.close();

});




