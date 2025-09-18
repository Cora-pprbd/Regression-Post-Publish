# Automated post publish tests 

## System Requirements
![Node.js](https://nodejs.org/en/download) ![Playwright](https://playwright.dev/docs/intro)

The Windows Execution Policy may be set to its default, Restricted, so it will need to be set to RemoteAssigned before running the automated tests. 
```Shell
# To set Execution Ploicy to RemoteSigned run
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

### Running tests with command

Use the npx and Playwright tools to run the test command.

```Shell
# Run from the file location for Regression-Post-Publish
npx playwright test ExampleTest.spec.ts 
# Or run in headed mode to see the browser
npx playwright test ExampleTest.spec.ts --headed
```

## Test Specific Requirements
The RequestInspection test requires the asset StockPhoto_03.jpg be stored in the local machine's Downloads folder. See below image:
![StockPhoto_03](https://github.com/user-attachments/assets/09fc870c-887b-4e1a-a707-cf7821a0880a)
