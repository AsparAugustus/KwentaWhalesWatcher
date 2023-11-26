function HextoString(input) {

    const sliced_input = input.substring(2)

    const output = Buffer.from(sliced_input, 'hex').toString('utf8');

    return output

}

module.exports = HextoString;