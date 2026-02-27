
async function testBinance() {
    try {
        // Binance usually uses symbols like USDTIDR for IDR pairs
        // Alternatively, we can check a public ticker
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=USDTIDR');

        console.log('Status:', response.status);
        const data = await response.json();
        console.log('Data:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testBinance();
