const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const randomDelay = require('./utils/randomDelay')

// Define an async function to use await
async function loginToTwitter() {
  // Set up the Selenium WebDriver
  const driver = new Builder().forBrowser('chrome').build();

  try {
    // Navigate to the website
    await driver.get('https://twitter.com/?lang=en-gb');

    console.log('Step 1: Navigated to Twitter');
    await driver.takeScreenshot(); // Capture a screenshot
    await driver.sleep(2000);

    // Wait for the button to be present
    const CookiesButton = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Refuse non-essential cookies")]')), 5000);
    if (await CookiesButton.isDisplayed()) {
    await CookiesButton.click();
    console.log('Clicked "CookiesButton"');
    await driver.takeScreenshot(); // Capture a screenshot
    await driver.sleep(randomDelay());
    }

    const SigninButton = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Sign in")]')), 5000);
    await SigninButton.click();
    await driver.sleep(randomDelay());

    // Find the username input field by attribute autocomplete="username"
    const usernameInput = await driver.findElement(By.css('input[autocomplete="username"]'));
    usernameInput.click()
    await usernameInput.sendKeys('KwentaWhales');
    const NextButton = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Next")]')), 5000);
    NextButton.click()
    await driver.sleep(randomDelay());
    const passwordInput = await driver.findElement(By.css('input[autocomplete="current-password"]'));
    await passwordInput.click()
    passwordInput.sendKeys('Yesyesye1')
    await driver.sleep(randomDelay());
    const LoginButton = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Log in")]')), 5000);
    await LoginButton.click()
    await driver.sleep(randomDelay());

    // Wait for the login to complete, you might need to customize the wait conditions
    await driver.wait(until.titleContains('Home'), 5000);

    console.log("Homepage confirmed")


    // Now you can perform actions on the logged-in page

    

  } catch (error) {
    console.error('Error:', error);
  } finally {
    return driver
  }
}



async function tweet(driver, content) {
  try {
    console.log("Trying to tweet")
    // Locate the element with the text "What is happening?!"
    await driver.sleep(randomDelay());
    // Locate the element with the attribute data-offset-key="biroq-0-0"
    const tweetElement = await driver.findElement(By.css('div.public-DraftStyleDefault-block[data-offset-key]'));

    // Click on the tweet element
    await tweetElement.click();
    await driver.sleep(randomDelay());

    // Type in a message
    await tweetElement.sendKeys(content);
    await driver.sleep(5000 + randomDelay());
    // Locate the button containing the word "Post" and click it
    const postButton = await driver.findElement(By.xpath('//span[contains(text(), "Post")]'));
    await postButton.click();
    await driver.sleep(randomDelay());

  
  } catch (error) {
    console.error('Error during interactions:', error);
  }
}




module.exports = {loginToTwitter, tweet}
