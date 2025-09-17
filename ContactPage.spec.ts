import { test, expect } from '@playwright/test';
import { debug } from 'console';


test('ContactPage', async ({ page }) => {
  await page.goto('https://www.pprbd.org/');

  ////////                          
  //Test contact page while not signed-in
  ////////       

  //Click the Contact menu bar button
  await page.getByRole('link', { name: 'Contact' }).click(); 
  //await page.waitForTimeout(4000); 

  // Locate the dropdown
  //const dropdown = page.locator('#Contact Group (required)');
  
  //Assert that the Contact Group dropdown is visible and contains the text
  await expect(page.getByLabel('Contact Group (required)')).toBeVisible();
  await expect(page.getByLabel('Contact Group (required)')).toContainText('---Select--- Building Permits Electrical Permits Mech/Plumbing Permits Building Inspectors Electrical Inspectors Conveyance Inspectors Mechanical Inspectors Plumbing Inspectors Contractor Licensing Plan Review Addressing Floodplain Public Relations Regional Building Attorney Finance/Accounting Website Errors');
  await page.waitForTimeout(7000); 

  //Select Website Errors from the dropdown
  await page.getByLabel('Contact Group (required)').selectOption('techsoft'); //Select "Website Errors" from the Contact Group dropdown
  await page.waitForTimeout(7000); 

  //Fill out the name, email, and phone boxes
  await page.getByRole('textbox', { name: 'Your Name (required)' }).click(); 
  await page.getByRole('textbox', { name: 'Your Name (required)' }).fill('Mike Test');
  //await expect(page.getByRole('textbox', { name: 'Your Name (required)' })).toHaveValue('Mike Test');
  await page.getByRole('textbox', { name: 'Your Email (required)' }).click();
  await page.getByRole('textbox', { name: 'Your Email (required)' }).fill('corar@pprbd.org');
  // await expect(page.getByRole('textbox', { name: 'Your Email (required)' })).toHaveValue('corar@pprbd.org');
  await page.getByRole('textbox', { name: 'Your Phone (optional)' }).click();
  await page.getByRole('textbox', { name: 'Your Phone (optional)' }).fill('7192558585');
  //  await expect(page.getByRole('textbox', { name: 'Your Phone (optional)' })).toHaveValue('7192558585');

  
  //Select "Something else isn't working" from the second dropdown
  await page.getByLabel('What is your inquiry').selectOption('Something else isn\'t working');

  //Fill out the Additional Info box
  await page.getByRole('textbox', { name: 'Additional Info (required)' }).click();
  await page.getByRole('textbox', { name: 'Additional Info (required)' }).fill('The quick brown fox jumped over the lazy dogs.');
  await expect(page.getByRole('textbox', { name: 'Additional Info (required)' })).toHaveValue('The quick brown fox jumped over the lazy dogs.');
  
//Click Send then verify that the form was sent
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page).toHaveTitle(/.*Thank you for contacting us/)

////////
//Test contact page while signed-in
////////

//Sign-in
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('rbdtest');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Pprbd2880!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  //Click the Contact menu bar button
  await page.getByRole('link', { name: 'Contact' }).click(); 
  await page.waitForTimeout(4000); 

  //Assert that the Contact Group dropdown is visible and contains the text
  await expect(page.getByLabel('Contact Group (required)')).toBeVisible();
  await expect(page.getByLabel('Contact Group (required)')).toContainText('---Select--- Building Permits Electrical Permits Mech/Plumbing Permits Building Inspectors Electrical Inspectors Conveyance Inspectors Mechanical Inspectors Plumbing Inspectors Contractor Licensing Plan Review Addressing Floodplain Public Relations Regional Building Attorney Finance/Accounting Website Errors');
  await page.waitForTimeout(7000); 

  //Select Website Errors from the dropdown
  await page.getByLabel('Contact Group (required)').selectOption('techsoft'); //Select from the Contact Group dropdown, Website Errors
  await page.waitForTimeout(7000); 

  //Fill out the name, email, and phone boxes
  await page.getByRole('textbox', { name: 'Your Name (required)' }).click(); 
  await page.getByRole('textbox', { name: 'Your Name (required)' }).fill('Mike Test');
  await page.getByRole('textbox', { name: 'Your Email (required)' }).click();
  await page.getByRole('textbox', { name: 'Your Email (required)' }).fill('corar@pprbd.org');
  await page.getByRole('textbox', { name: 'Your Phone (optional)' }).click();
  await page.waitForTimeout(4000); 
  await page.getByRole('textbox', { name: 'Your Phone (optional)' }).fill('7192558585');
  
  //Select "Something else isn't working" from the second dropdown
  await page.getByLabel('What is your inquiry').selectOption('Something else isn\'t working');

  //Fill out the Additional Info box
  await page.getByRole('textbox', { name: 'Additional Info (required)' }).click();
  await page.getByRole('textbox', { name: 'Additional Info (required)' }).fill('The quick brown fox jumped over the lazy dogs.');

//Click Send then verify that the form was sent
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page).toHaveTitle(/.*Thank you for contacting us/)

});