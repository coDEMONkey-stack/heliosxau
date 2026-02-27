
const apiKey = 'bro5ftljgiys0v86a89e';

async function testApi() {
    try {
        const response = await fetch('https://api.freecryptoapi.com/v1/getDataCurrency?symbol=USDT&currency=IDR', {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        console.log('Status:', response.status);
        if (!response.ok) {
            console.log('Error Body:', await response.text());
            return;
        }

        const data = await response.json();
        console.log('Data:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testApi();
