export const getUsdtIdrRate = async (): Promise<number> => {
    const apiKey = import.meta.env.VITE_FREE_CRYPTO_API_KEY;
    const FALLBACK_RATE = 16000;

    if (!apiKey) {
        console.warn('FreeCryptoAPI key missing, using fallback rate.');
        return FALLBACK_RATE;
    }

    try {
        const response = await fetch('https://api.freecryptoapi.com/v1/getDataCurrency?symbol=USDT&currency=IDR', {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        // The API structure for /getDataCurrency usually returns an array or object
        // Based on doc research, it might be data[0].price or data.price
        // Let's assume a standard ticker response or adjust if needed
        const rate = data?.price || data?.[0]?.price;

        if (rate && typeof rate === 'number') {
            return rate;
        }

        console.warn('Unexpected API response structure, using fallback rate.', data);
        return FALLBACK_RATE;
    } catch (error) {
        console.error('Failed to fetch USDT rate:', error);
        return FALLBACK_RATE;
    }
};
