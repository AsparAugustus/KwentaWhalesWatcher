const HextoString = require('../utils/HexToString')
const convertToTweetContent = require('./convertToTweetContent')
const axios = require('axios');
const ethers = require('ethers')

const kwentaTracking = "0x4b57454e54410000000000000000000000000000000000000000000000000000"
const EIGHTEEN_ZEROS = 10 ** 18


const query = `
    query futuresTrades($first: Int, $orderBy: String, $orderDirection: String) {
        futuresTrades(first: 1000, orderBy: timestamp, orderDirection: desc) {
        id
        timestamp
        account
        abstractAccount
        positionSize
        pnl
        margin
        asset
        trackingCode
        accountType
        marketKey
        orderType
        size
        price
        positionClosed
        }
    }
`;



const FetchTxData = async () => {


    try {

        const response = await axios.post('https://api.thegraph.com/subgraphs/name/kwenta/optimism-perps', {
            query: query,
        })

        if (response.status === 200) {


            
            return {data : response.data.data.futuresTrades}
        }
      


    } catch (err) {

        const timestamp = new Date().toLocaleString();

        console.log(err.message, timestamp)

    }
    




}

const hexString = '0x7345544850455250000000000000000000000000000000000000000000000000'; // hexadecimal representation of "Hello World"




const fetchAndProcessTxData = async (initial_fetch_lookback_period, minimumTradeSize) => {

    const startTimestamp = Date.now()
    

    let {data} = await FetchTxData()


   


    if(!data) return
    let filteredData = data.filter((entry) => {

        const size = entry.size / EIGHTEEN_ZEROS
        const price = entry.price / EIGHTEEN_ZEROS
        const usdvalue = size * price

        const position_opened_at = entry.timestamp

        // Get the current timestamp in milliseconds
        let currentTimestamp = Date.now()/1000

        // Subtract four hours (in milliseconds) from the current timestamp
        let minutesBeforeInSeconds = currentTimestamp - 60 * initial_fetch_lookback_period;

        
        
       return entry.trackingCode === kwentaTracking && usdvalue >= minimumTradeSize && position_opened_at > minutesBeforeInSeconds

    })

   

    let TweetsArray = []

    filteredData.forEach((entry) => {

        const asset = HextoString(entry.asset)
        const size = entry.size / EIGHTEEN_ZEROS
        const price = entry.price / EIGHTEEN_ZEROS
        const usdvalue = size * price
        const trackingCode = HextoString(entry.trackingCode)
       
        let date = new Date(entry.timestamp * 1000)

        const timestamp = date.toLocaleString()

        // console.log(`${asset}, ${size}, ${price}, ${usdvalue}, ${timestamp}`)

        TweetsArray.push(convertToTweetContent(entry))

       

    })

    return TweetsArray

}


module.exports = fetchAndProcessTxData