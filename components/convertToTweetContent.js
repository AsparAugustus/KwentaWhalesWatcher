var HextoString = require('../utils/HexToString')
const kwentaTracking = "0x4b57454e54410000000000000000000000000000000000000000000000000000"
const EIGHTEEN_ZEROS = 10 ** 18

function convertToTweetContent (entry) {

    
    const size = entry.size / EIGHTEEN_ZEROS
    const price = entry.price / EIGHTEEN_ZEROS
    const usdvalue = Math.floor(size * price)

    const usdvalue_formatted = usdvalue.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    
    let date = new Date(entry.timestamp * 1000)
    const timestamp = date.toLocaleString()

    let direction = "";
    if (size >= 0) {
        direction = "LONG"
    } else {
        direction = "SHORT"
    }


    const asset = HextoString(entry.asset)

    const posClosed = entry.positionClosed

    if(!posClosed) {
        console.log(`${usdvalue_formatted} $${asset} ${direction}ED @${price} ${timestamp} on https://kwenta.eth.limo/`)
    } else {
        if (direction === "LONG") {
            direction = "SHORT"
        } else {
            direction = "LONG" 
        }
        console.log(`${usdvalue_formatted} $${asset} ${direction} CLOSED @${price} ${timestamp}`)
    }


}

module.exports = convertToTweetContent 