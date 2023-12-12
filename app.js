const fetchAndProcessTxData = require("./components/fetchAndProcessTxData")
const randomDelay = require('./utils/randomDelay')
const tweet = require('./components/tweet')

//fetch interval in minutes
const fetch_interval = 5
// lookback period in minutes
const initial_fetch_lookback_period = 5
//in USD
const minimumTradeSize = 5000

const tweetWithDelay = async (entry) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await tweet(entry)
    await delay(0.1 * 60 * 1000 + randomDelay());
};

const tweetAllEntries = async (tweetsArray) => {
    for (const entry of tweetsArray) {
   
        await tweetWithDelay(entry);
    }
};

const fetchAndTweet = async (initial_fetch_lookback_period, minimumTradeSize) => {

    const tweetsArray = await fetchAndProcessTxData(initial_fetch_lookback_period, minimumTradeSize);

    if(tweetsArray) {
        await tweetAllEntries(tweetsArray);
    }
    

    const timestamp = new Date().toLocaleString();

    console.log(tweetsArray, timestamp)

}


const main = async () => {



    console.log("running")

    //First initial fetch
    await fetchAndTweet(initial_fetch_lookback_period, minimumTradeSize)

    
    //Subsequent fetches
    setInterval( 
        async() => {
            fetchAndTweet(fetch_interval, minimumTradeSize)
    }, fetch_interval * 60 * 1000)


      // Handle process exit event
    process.on('exit', () => {
        console.log('Exiting program. Clearing interval.');
        clearInterval(intervalId);
    });




   
    
}
main()


    





