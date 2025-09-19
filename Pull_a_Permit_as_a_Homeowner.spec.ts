import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.pprbd.org/');

  //Sign-in
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('akerkei@pprbd.org');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Temp@2023!!!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('https://www.pprbd.org/Account/Admin');

  //Impersonate a homeowner
  
  await page.goto('https://www.pprbd.org/');
  await page.getByRole('combobox', { name: 'Run As:' }).click();
  await page.getByRole('combobox', { name: 'Run As:' }).fill('rbdtesthome');
  await page.locator('#RunAsGoButton').click();

    //Click on Pull New Permit
    
  await page.getByRole('link', { name: 'Pull New Permit' }).click();
  await page.goto('https://www.pprbd.org/Permit/New');
  await page.getByText('Yes, I Agree', { exact: true }).click();
  await page.getByLabel('Select a Project:').selectOption('WHR');
  await page.getByRole('textbox', { name: 'Total Valuation:' }).click();
  await page.getByRole('textbox', { name: 'Total Valuation:' }).fill('500');
  await page.getByRole('textbox', { name: 'Total Valuation:' }).press('Enter');
  await page.getByText('Add Permit To Cart', { exact: true }).click();
  await page.getByRole('radio', { name: 'Gas' }).check();
  await page.getByRole('radio', { name: 'Existing' }).check();
  await page.locator('#prompt-PV-Y').check();
  await page.getByText('Continue').click();
  await page.goto('https://www.pprbd.org/Account/Cart');

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



