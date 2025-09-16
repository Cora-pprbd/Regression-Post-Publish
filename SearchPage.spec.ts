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
  await page.goto('https://alpha.pprbd.org/Account/Contractor');

  //Search Site
  await page.getByRole('link', { name: 'Search', exact: true }).click();
  await page.getByRole('combobox', { name: 'Search This Site' }).click();
  await page.getByRole('combobox', { name: 'Search This Site' }).fill('Code');
  await page.getByRole('button', { name: 'Search' }).click();
  //Assert that any results attempted to load
  await expect(page.locator('#main')).toContainText('Results From Downloads and Handouts:');
  //Assert that results include 2023 Pikes Peak Regional Building Code - 1st Printing
  await expect(page.locator('#main')).toContainText('2023 Pikes Peak Regional Building Code - 1st Printing');

  //Search Downloads
  await page.getByRole('link', { name: 'Search Downloads' }).click();
  await page.getByRole('textbox', { name: 'Document or Handout Title' }).click();
  await page.getByRole('textbox', { name: 'Document or Handout Title' }).fill('Code');
  await page.getByRole('button', { name: 'Search' }).click();
  //Assert that results include 2023 Pikes Peak Regional Building Code - 1st Printing
  await expect(page.locator('#main')).toContainText('2023 Pikes Peak Regional Building Code - 1st Printing');

  //Search Permits by address
  await page.getByRole('link', { name: 'Search Permits' }).click();

 
  await page.getByRole('spinbutton', { name: 'Street #' }).click();
  await page.getByRole('spinbutton', { name: 'Street #' }).fill('2880');
  await page.getByRole('spinbutton', { name: 'Street #' }).press('Tab');
  await page.getByRole('tabpanel', { name: 'Basic Search' }).getByLabel('Direction').press('Tab');
  await page.getByRole('textbox', { name: 'Street Name' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Street Name' }).type('INTERNATIONAL', { delay: 100 });
  await page.waitForTimeout(4000);
  await page.getByRole('textbox', { name: 'Street Name' }).press('Enter');
  await page.waitForTimeout(5000);
  await page.getByRole('tabpanel', { name: 'Basic Search' }).getByLabel('Type').selectOption('CIR');
  await page.waitForTimeout(4000);
  await page.getByRole('tabpanel', { name: 'Basic Search' }).getByLabel('City').press('Enter');
  await page.waitForTimeout(4000);
  await page.getByRole('tabpanel', { name: 'Basic Search' }).getByLabel('City').selectOption('COLORADO SPRINGS');
  await page.getByRole('button', { name: 'Search for Permits' }).click();


  //Assert that results are "For:"...
  await expect(page.locator('#SearchResultsHeading')).toContainText('For: 2880 INTERNATIONAL CIR, COLORADO SPRINGS, CO. Valuation Between: $0 and $8,000,000.');

  //Search Permits by permit number
  
  await page.getByLabel('Search By', { exact: true }).selectOption('By Permit Number');
  await page.getByRole('textbox', { name: 'Permit Number' }).click();
  await page.getByRole('textbox', { name: 'Permit Number' }).fill('O36434');
  await page.getByRole('button', { name: 'Search for Permits' }).click();

  //Search Permits by location
  await page.getByLabel('Search By', { exact: true }).selectOption('By Location');
  await page.getByRole('textbox', { name: 'Latitude' }).click();
  await page.getByRole('textbox', { name: 'Latitude' }).click();
  await page.getByRole('textbox', { name: 'Latitude' }).fill('');
  await page.getByRole('textbox', { name: 'Longitude' }).click();
  await page.getByRole('textbox', { name: 'Longitude' }).fill('');
  await page.getByRole('textbox', { name: 'Latitude' }).click();
  await page.getByRole('textbox', { name: 'Latitude' }).fill('38.905913');
  await page.getByRole('textbox', { name: 'Longitude' }).click();
  await page.getByRole('textbox', { name: 'Longitude' }).fill('-104.819693');
  await page.getByRole('button', { name: 'Search for Permits' }).click();
  //Assert that results appear by checking text for Valuation Between...
  //Valuation range may change if list of permits changes, so exact $ range will cause a failure
  await expect(page.locator('#SearchResultsHeading')).toContainText('Near 38.905913, -104.819693.');

  //Search Permits by parcel
  await page.getByLabel('Search By', { exact: true }).selectOption('By Parcel Number');
  await page.getByRole('textbox', { name: 'Parcel Number' }).click();
  await page.getByRole('textbox', { name: 'Parcel Number' }).fill('5310201001');
  await page.getByRole('textbox', { name: 'Parcel Number' }).press('Enter');
  await page.getByRole('button', { name: 'Search for Permits' }).click();
  //Assert that results appear by checking text for Valuation Between...
  await expect(page.locator('#SearchResultsHeading')).toContainText('Valuation Between:');

  //Search Permits by plan tracking
  await page.getByLabel('Search By', { exact: true }).selectOption('By Plan Tracking Number');
  await page.getByRole('textbox', { name: 'Plan Tracking Number' }).click();
  await page.getByRole('textbox', { name: 'Plan Tracking Number' }).fill('R158301');
  await page.getByRole('button', { name: 'Search for Permits' }).click();
  //Assert that there are results
  await expect(page.locator('#ResultsGrid_table_PermitLink')).toContainText('Permit #');
  

  //Search Plans
  await page.getByRole('link', { name: 'Search Plans' }).click();

  //Search Plans by address
    //Fill Street #
    await page.getByRole('spinbutton', { name: 'Street #' }).click();
    await page.getByRole('spinbutton', { name: 'Street #' }).fill('2880');
    //Select Type
    const typeDropdown = page.locator('#AddressSearch_sttype');
    await expect(typeDropdown).toBeVisible();
    await typeDropdown.selectOption('CIR');
    //Select City
    const cityDropdown = page.locator('#AddressSearch_stcity');
    await expect(cityDropdown).toBeVisible();
    await cityDropdown.selectOption('COLORADO SPRINGS');
    //Fill Street Name after City selection
    const streetNameInput = page.locator('#AddressSearch_stname');
    await expect(streetNameInput).toBeVisible();
    await streetNameInput.type('INTERNATIONAL', { delay: 100 });
    await page.waitForTimeout(4000); 
    await expect(streetNameInput).toHaveValue('INTERNATIONAL');
    //Search
    await page.getByRole('button', { name: 'Search for Plans' }).click();
    //Assert that results are "For: 2880 INTERNATIONAL CIR, COLORADO SPRINGS, CO"
    await expect(page.locator('#SearchResultsHeading')).toContainText('For: 2880 INTERNATIONAL CIR, COLORADO SPRINGS, CO');

  //Search Plans by location
  await page.getByLabel('Search Type').selectOption('By Location');
  await page.getByRole('textbox', { name: 'Latitude' }).click();
  await page.getByRole('textbox', { name: 'Latitude' }).fill('');
  await page.getByRole('textbox', { name: 'Longitude' }).click();
  await page.getByRole('textbox', { name: 'Longitude' }).fill('');
  await page.getByRole('textbox', { name: 'Latitude' }).click();
  await page.getByRole('textbox', { name: 'Latitude' }).fill('38.905913');
  await page.getByRole('textbox', { name: 'Longitude' }).click();
  await page.getByRole('textbox', { name: 'Longitude' }).fill('-104.819693');
  await page.getByRole('button', { name: 'Search for Plans' }).click();

  //Search Plans by plan number
  await page.getByLabel('Search Type').selectOption('By Plan Number');
  await page.getByRole('textbox', { name: 'Plan Number' }).click();
  await page.getByRole('textbox', { name: 'Plan Number' }).fill('R158301');
  await page.getByRole('button', { name: 'Search for Plans' }).click();

  //Search Contractors tab
  await page.getByRole('link', { name: 'Search Contractors' }).click();
  await page.getByRole('textbox', { name: 'Contractor, Licensee, or' }).click();
  await page.getByRole('textbox', { name: 'Contractor, Licensee, or' }).fill('Alarm Design');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('link', { name: 'Business Info' }).first().click();
});