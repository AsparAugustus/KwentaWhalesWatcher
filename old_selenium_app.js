const fetchAndProcessTxData = require("./components/fetchAndProcessTxData")
const randomDelay = require('./utils/randomDelay')
const selenium_module = require('./selenium_module')

const fetch_interval = 60 * 60 * 1000

let driver;
const init = (async () => {
    driver = await selenium_module.loginToTwitter();

    const runMain = async () => {
        await main();
        setTimeout(runMain, fetch_interval);
    };
    runMain()
})();

const tweetWithDelay = async (entry) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await selenium_module.tweet(driver, entry);
    await delay(0.1 * 60 * 1000 + randomDelay());
};

const tweetAllEntries = async (tweetsArray) => {
    for (const entry of tweetsArray) {
        await tweetWithDelay(entry);
    }
};


const main = async () => {

    //fetch data first, it returns tweets in an array
    //fetch once every hour
    //use selenium to tweet each entry, once every two minutes if theres more than 1?

    console.log("running")

    //input is how frequent it fetches, 1 is 1 hour
    const tweetsArray = await fetchAndProcessTxData(8);

    console.log(tweetsArray)




    await tweetAllEntries(tweetsArray);
    
}


    





