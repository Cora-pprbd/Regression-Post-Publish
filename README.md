# Automated post publish tests 

## System Requirements
![Node.js](https://nodejs.org/en/download) ![Playwright](https://playwright.dev/docs/intro)

### Running tests with command

Use the npx and Playwright tools to run the test command.

```Shell
# Run from the project's root directory
npx playwright test ExampleTest.spec.ts 
# Or run in headed mode to see the browser
npx playwright test ExampleTest.spec.ts --headed
```

## Test Specific Requirements
The RequestInspection test requires the asset StockPhoto_03.jpg be stored in the local machine's Downloads folder. 
![StockPhoto_03](https://github.com/user-attachments/assets/09fc870c-887b-4e1a-a707-cf7821a0880a)
