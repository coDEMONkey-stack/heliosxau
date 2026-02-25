import { useRef, useEffect } from 'react';
import { useCandlestickChart } from '../hooks/useCandlestickChart';

interface CandlestickChartProps {
    width?: number;
    height?: number;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ width = 800, height = 400 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { data } = useCandlestickChart(2000);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            const now = Date.now();

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Margins for signals
            const marginTop = 50;
            const marginBottom = 50;
            const chartHeight = height - marginTop - marginBottom;

            // Background Grid
            ctx.strokeStyle = 'rgba(51, 51, 51, 0.5)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            for (let x = 0; x < width; x += 50) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
            for (let y = 0; y < height; y += 50) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            ctx.stroke();

            if (data.length === 0) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            // Calculate scale
            const minPrice = Math.min(...data.map(d => d.low));
            const maxPrice = Math.max(...data.map(d => d.high));
            const priceRange = maxPrice - minPrice || 1;

            const candleWidth = (width / data.length) * 0.8;
            const spacing = (width / data.length) * 0.2;

            data.forEach((candle, index) => {
                const x = index * (candleWidth + spacing);

                const yOpen = marginTop + chartHeight - ((candle.open - minPrice) / priceRange) * chartHeight;
                const yClose = marginTop + chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight;
                const yHigh = marginTop + chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight;
                const yLow = marginTop + chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight;

                const isBullish = candle.close >= candle.open;

                // Set colors based on brand
                ctx.fillStyle = isBullish ? '#10B981' : '#Eaeaea';
                ctx.strokeStyle = isBullish ? '#10B981' : '#Eaeaea';
                ctx.lineWidth = 1;

                // Wick
                ctx.beginPath();
                ctx.moveTo(x + candleWidth / 2, yHigh);
                ctx.lineTo(x + candleWidth / 2, yLow);
                ctx.stroke();

                // Body
                const bodyHeight = Math.abs(yOpen - yClose);
                const yBody = Math.min(yOpen, yClose);
                ctx.fillRect(x, yBody, candleWidth, Math.max(bodyHeight, 1));

                // Render Signals
                if (candle.signal) {
                    const isBuy = candle.signal === 'buy';
                    const signalColor = isBuy ? '#10B981' : '#EF4444';

                    // Pulse animation
                    const pulse = Math.sin(now / 150 + index) * 0.2 + 1;
                    const signalY = isBuy ? yLow + 20 : yHigh - 20;

                    ctx.save();
                    ctx.translate(x + candleWidth / 2, signalY);
                    ctx.scale(pulse, pulse);

                    ctx.fillStyle = signalColor;
                    ctx.font = 'bold 10px Inter';
                    ctx.textAlign = 'center';

                    // Draw Arrow
                    ctx.beginPath();
                    if (isBuy) {
                        ctx.moveTo(0, -5);
                        ctx.lineTo(-5, 5);
                        ctx.lineTo(5, 5);
                    } else {
                        ctx.moveTo(0, 5);
                        ctx.lineTo(-5, -5);
                        ctx.lineTo(5, -5);
                    }
                    ctx.closePath();
                    ctx.fill();

                    // Draw Text (Signal)
                    ctx.fillText(isBuy ? 'BUY' : 'SELL', 0, isBuy ? 15 : -10);

                    // Draw Result Motion (Profit/Loss)
                    if (candle.result && candle.profitValue) {
                        const isProfit = candle.result === 'profit';
                        const timeOffset = (now % 3000) / 3000; // 3s loop for each label
                        const floatY = isProfit ? -25 - (timeOffset * 40) : 25 + (timeOffset * 40);
                        const opacity = 1 - timeOffset;

                        ctx.save();
                        ctx.globalAlpha = opacity;
                        ctx.fillStyle = isProfit ? '#10B981' : '#EF4444';
                        ctx.font = '700 32px Inter'; // Ultra large font
                        ctx.textAlign = 'center';

                        // Text Stroke for readability
                        ctx.strokeStyle = '#000000';
                        ctx.lineWidth = 6;
                        const text = isProfit ? `+${candle.profitValue}usd` : `-${candle.profitValue}usd`;

                        ctx.strokeText(text, 0, floatY);
                        ctx.fillText(text, 0, floatY);
                        ctx.restore();
                    }

                    ctx.restore();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [data, width, height]);

    return <canvas ref={canvasRef} width={width} height={height} className="w-full h-full" />;
};

export default CandlestickChart;
