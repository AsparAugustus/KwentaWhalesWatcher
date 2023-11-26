var axios = require('axios');
var ethers = require('ethers')
var HextoString = require('./utils/HexToString')
var convertToTweetContent = require('./components/convertToTweetContent')

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
            const lastFetchTimestamp = Date.now()
            return {data : response.data.data.futuresTrades, lastFetchTimestamp: lastFetchTimestamp}
        }
      


    } catch (err) {

        console.log(err)

    }
    




}

const hexString = '0x7345544850455250000000000000000000000000000000000000000000000000'; // hexadecimal representation of "Hello World"

console.log(HextoString(hexString))


const main = async () => {

    const startTimestamp = Date.now()

    let {data, lastFetchTimestamp} = await FetchTxData()
    



    if(!data) return
    let filteredData = data.filter((entry) => {

        const size = entry.size / EIGHTEEN_ZEROS
        const price = entry.price / EIGHTEEN_ZEROS
        const usdvalue = size * price




       return entry.trackingCode === kwentaTracking && usdvalue >= 100000

    })

    console.log(filteredData)

    filteredData.forEach((entry) => {

        const asset = HextoString(entry.asset)
        const size = entry.size / EIGHTEEN_ZEROS
        const price = entry.price / EIGHTEEN_ZEROS
        const usdvalue = size * price
        const trackingCode = HextoString(entry.trackingCode)
       
        let date = new Date(entry.timestamp * 1000)

        const timestamp = date.toLocaleString()

        // console.log(`${asset}, ${size}, ${price}, ${usdvalue}, ${timestamp}`)

        convertToTweetContent(entry)

    })

}
main()



