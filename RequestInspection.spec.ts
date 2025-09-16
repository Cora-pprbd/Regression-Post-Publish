import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://alpha.pprbd.org/');
  //Sign-in
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('rbdtest');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Pprbd2880!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  //Go to Contractor Dashboard > Permits 
  await page.locator('#viewPermits img').first().click();

  //Click on a permit from my list
  await page.getByRole('link', { name: 'Permit Info', exact: true }).nth(1).click();

  //Request and inspection for this permit
  await page.getByRole('button', { name: 'Request an Inspection' }).click();

    //Tick the Send Email Notification box and add an email 
    await page.getByRole('radio', { name: 'Send Email Notification for' }).check();
    await page.getByRole('textbox', { name: 'Add a contact email for this' }).click();

      //Also check email validation
      await page.getByRole('textbox', { name: 'Add a contact email for this' }).fill('corar@pprbd');
      await page.getByRole('button', { name: 'Add This Email' }).click();

      //Assert that the email validation message appears
      await expect(page.locator('#invalidEmail')).toContainText('Please enter a valid email address.');

      //Add a valid email address
      await page.getByRole('textbox', { name: 'Add a contact email for this' }).click();
      await page.getByRole('textbox', { name: 'Add a contact email for this' }).fill('corar@pprbd.org');
      await page.getByRole('button', { name: 'Add This Email' }).click();

    //Upload relevant inspection images
    const path = require('path');
    const os = require('os');
    
      //Get the full path to the file in the Downloads folder
      const filePath = path.join(os.homedir(), 'Downloads', 'StockPhoto_03.jpg');

      //Log the resolved file path
      console.log('Resolved file path:', filePath);

    //Upload the file using the correct locator
    await page.locator('#InspectionFiles_0__File').setInputFiles(filePath);
    await page.locator('#InspectionFiles_0__FileType').selectOption('Miscellaneous');

    //Write a comment for the inspector
    await page.getByRole('textbox', { name: 'Comment:' }).click();
    await page.getByRole('textbox', { name: 'Comment:' }).fill('TEST');

    //Add a phone number for the call ahead
    await page.getByRole('textbox', { name: 'Phone # (Area Code Required):' }).click();
    await page.getByRole('textbox', { name: 'Phone # (Area Code Required):' }).fill('');
    await page.getByRole('textbox', { name: 'Phone # (Area Code Required):' }).press('Enter');
    await page.getByRole('textbox', { name: 'Phone # (Area Code Required):' }).click();
    await page.getByRole('textbox', { name: 'Phone # (Area Code Required):' }).fill('7192558585');

  //Click 'Request this Inspection'
  await page.getByRole('button', { name: 'Request This Inspection' }).click();

    //Assert that inspection was successfully requested
    await expect(page.locator('#userMessage')).toContainText('We have received your inspection request!');

  //Cancel the inspection 
    //Go to the inspection details
    await page.locator('#PermitNumberLink').click();

    //Scroll to Open Inspection Requests and click View/Modify
    await page.getByRole('link', { name: 'View/Modify' }).click();
    
    //Cancel
    await page.getByRole('button', { name: 'Cancel Inspection' }).click();
    await page.getByRole('button', { name: 'Yes, Cancel this Inspection' }).click();

    //Assert that the inspection has been cancelled
    await expect(page.getByRole('alert')).toContainText('Your inspection request has been cancelled.');

});