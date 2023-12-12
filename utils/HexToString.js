function HextoString(input) {
    try {
        // Assuming input is a hexadecimal string starting with '0x'
        const sliced_input = input.substring(2);
        
        const outputBuffer = Buffer.from(sliced_input, 'hex');
        const outputString = outputBuffer.toString('utf8').replace(/\0/g, ''); // Remove null bytes

        // console.log('Input:', input);
        // console.log('Output Buffer:', outputBuffer);
        // console.log('Output String:', outputString);

        return outputString;
    } catch (error) {
        console.error('Error in HextoString function:', error.message);
        return null; // or handle the error accordingly
    }
}

module.exports = HextoString;
