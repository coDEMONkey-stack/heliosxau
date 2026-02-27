export const getUsdtIdrRate = async (): Promise<number> => {
    // Switch to CoinGecko for more reliable free rates without access issues
    const FALLBACK_RATE = 16700;

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=idr');

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        // CoinGecko structure: { "tether": { "idr": 16791.6 } }
        const rate = data?.tether?.idr;

        if (rate && typeof rate === 'number') {
            return rate;
        }

        console.warn('Unexpected CoinGecko response structure, using fallback rate.', data);
        return FALLBACK_RATE;
    } catch (error) {
        console.error('Failed to fetch USDT rate from CoinGecko:', error);
        return FALLBACK_RATE;
    }
};
