import { useState, useEffect, useRef } from 'react';

export interface Candle {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    signal?: 'buy' | 'sell';
    result?: 'profit' | 'loss';
    profitValue?: number; // USD value
}

export const useCandlestickChart = (initialPrice: number = 2000) => {
    const [data, setData] = useState<Candle[]>([]);
    const currentPrice = useRef(initialPrice);
    const lastSignalTime = useRef(0);
    const candleCount = useRef(0);

    useEffect(() => {
        // Generate initial history
        const history: Candle[] = [];
        let price = currentPrice.current;
        const now = Date.now();

        for (let i = 0; i < 100; i++) { // 100 candles history
            const open = price;
            const volatility = (Math.random() - 0.5) * 2;
            const close = open + volatility;
            const high = Math.max(open, close) + Math.random() * 0.5;
            const low = Math.min(open, close) - Math.random() * 0.5;

            // Occasional historical signals
            let signal: 'buy' | 'sell' | undefined;
            let result: 'profit' | 'loss' | undefined;
            let profitValue: number | undefined;

            if (i > 15 && Math.random() > 0.94 && i - lastSignalTime.current > 12) {
                signal = close > open ? 'buy' : 'sell';
                result = Math.random() > 0.3 ? 'profit' : 'loss';
                // Random value between $20 and $150
                profitValue = Math.floor(Math.random() * 130) + 20;
                lastSignalTime.current = i;
            }

            history.push({
                time: now - (100 - i) * 1000,
                open,
                high,
                low,
                close,
                signal,
                result,
                profitValue
            });
            price = close;
            candleCount.current++;
        }
        setData(history);
        currentPrice.current = price;

        // Simulate live data
        const interval = setInterval(() => {
            setData(prev => {
                const lastCandle = prev[prev.length - 100] ? prev[prev.length - 1] : prev[0]; // safety
                if (!lastCandle) return prev;
                const newTime = Date.now();

                // 90% chance to update current candle, 10% to create new
                const isNewCandle = Math.random() > 0.9;

                if (isNewCandle) {
                    candleCount.current++;
                    const open = currentPrice.current;
                    const volatility = (Math.random() - 0.5) * 1.5;
                    const close = open + volatility;
                    const high = Math.max(open, close) + Math.random() * 0.4;
                    const low = Math.min(open, close) - Math.random() * 0.4;

                    currentPrice.current = close;

                    // Signal logic for new candle
                    let signal: 'buy' | 'sell' | undefined;
                    let result: 'profit' | 'loss' | undefined;
                    let profitValue: number | undefined;
                    const timeSinceLastSignal = candleCount.current - lastSignalTime.current;

                    if (timeSinceLastSignal > 12) {
                        // Trend-based probability
                        const recentClose = lastCandle.close;
                        const olderClose = prev[prev.length - 10]?.close || recentClose;

                        if (close > open && recentClose > olderClose && Math.random() > 0.6) {
                            signal = 'buy';
                            result = Math.random() > 0.2 ? 'profit' : 'loss';
                            profitValue = Math.floor(Math.random() * 130) + 20;
                            lastSignalTime.current = candleCount.current;
                        } else if (close < open && recentClose < olderClose && Math.random() > 0.6) {
                            signal = 'sell';
                            result = Math.random() > 0.2 ? 'profit' : 'loss';
                            profitValue = Math.floor(Math.random() * 130) + 20;
                            lastSignalTime.current = candleCount.current;
                        }
                    }

                    const newCandle: Candle = { time: newTime, open, high, low, close, signal, result, profitValue };
                    return [...prev.slice(1), newCandle];
                } else {
                    // Update last candle
                    const updatedLast = { ...lastCandle };
                    const volatility = (Math.random() - 0.5) * 0.3;
                    updatedLast.close += volatility;
                    updatedLast.high = Math.max(updatedLast.high, updatedLast.close);
                    updatedLast.low = Math.min(updatedLast.low, updatedLast.close);
                    currentPrice.current = updatedLast.close;
                    return [...prev.slice(0, -1), updatedLast];
                }
            });
        }, 100);

        return () => clearInterval(interval);
    }, [initialPrice]);

    return { data };
};
