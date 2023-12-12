var HextoString = require('../utils/HexToString')
const kwentaTracking = "0x4b57454e54410000000000000000000000000000000000000000000000000000"
const EIGHTEEN_ZEROS = 10 ** 18

function convertToTweetContent (entry) {

    
    const size = entry.size / EIGHTEEN_ZEROS
    const price = (entry.price / EIGHTEEN_ZEROS).toFixed(6).toLocaleString('en-US', {style: 'currency', currency : 'USD'})
    const usdvalue = Math.floor(size * price)
    const account = entry.account

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


    const kwenta_link = `https://kwenta.eth.limo/market/?asset=${asset}&accountType=smart_margin&wallet=${account}&tab=position`

    if(!posClosed) {
        return (`${usdvalue_formatted} $${asset} ${direction}ED at $${price}\\n${timestamp} UTC\\n Keep track of this wallet with Kwenta Watcher below 👇\\n\\n${kwenta_link}`)
    } else {
        if (direction === "LONG") {
            direction = "SHORT"
        } else {
            direction = "LONG" 
        }
        return (`${usdvalue_formatted} $${asset} ${direction} CLOSED at $${price}\\n${timestamp} UTC\\nKeep track of this wallet with Kwenta Watcher below 👇\\n\\n${kwenta_link}`)
    }


}

module.exports = convertToTweetContent 