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

  //Go to the Contractor Dashboard
  await page.goto('https://alpha.pprbd.org/Account/Contractor');

  //View my permits
  await page.locator('#viewPermits img').first().click();
  await page.locator('div:nth-child(8)').click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.locator('#viewPermits img').first().click();

  //Click on a permit from my list
  await page.getByRole('link', { name: 'Permit Info', exact: true }).nth(1).click();

  //Request and inspection for this permit
  await page.getByRole('button', { name: 'Request an Inspection' }).click();

  //Tick the Send Email Notification box and add an email
  await page.getByRole('radio', { name: 'Send Email Notification for' }).check();
  await page.getByRole('textbox', { name: 'Add a contact email for this' }).click();
  await page.getByRole('textbox', { name: 'Add a contact email for this' }).fill('corar@pprbd');
  await page.getByRole('button', { name: 'Add This Email' }).click();
  await page.getByRole('textbox', { name: 'Add a contact email for this' }).click();
  await page.getByRole('textbox', { name: 'Add a contact email for this' }).fill('corar@pprbd.org');
  await page.getByRole('button', { name: 'Add This Email' }).click();

  //Upload relevant inspection images
  await page.locator('#InspectionFiles_0__File').click();
  const path = require('path');
  await page.getByLabel('#InspectionFiles_0__File').setInputFiles(path.join(__dirname, 'StockPhoto_03.jpg'));
  //await page.locator('#InspectionFiles_0__File').setInputFiles('StockPhoto_03.jpg', 'C:\Users\Corar\Downloads\StockPhoto_03.jpg');
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






  await page.goto('https://alpha.pprbd.org/Permit/RequestInspection?permitNo=J56719');
  await page.getByRole('link', { name: 'J56719' }).click();

  //Cancel the inspection 
  await page.getByRole('link', { name: 'View/Modify' }).click();
  await page.getByRole('button', { name: 'Cancel Inspection' }).click();
  await page.getByRole('button', { name: 'Yes, Cancel this Inspection' }).click();
});