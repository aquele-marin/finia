"use client";
import { Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Tooltip,
    Legend,
    CategoryScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Tooltip,
    Legend,
    CategoryScale
);

// Função para calcular a média móvel simples
const calculateMovingAverage = (
    data: { x: Date; y: number }[],
    windowSize: number
) => {
    const movingAverage = [];
    for (let i = windowSize - 1; i < data.length; i++) {
        const window = data.slice(i - windowSize + 1, i + 1);
        const sum = window.reduce((acc, val) => acc + val.y, 0);
        movingAverage.push({ x: data[i].x, y: sum / windowSize });
    }
    return movingAverage;
};

interface StockDay {
    "1. open": number;
    "2. high": number;
    "3. low": number;
    "4. close": number;
    "5. adjusted close": number;
    "6. volume": number;
    "7. dividend amount": number;
    "8. split coefficient": number;
}

interface ScatterStockProps {
    stocks: Record<string, StockDay>; // { '2024-09-01': { max, min, open, close }, ... }
    symbol: string;
    message: string;
}

export const StockScatterPlot: React.FC<ScatterStockProps> = ({
    stocks,
    symbol,
    message,
}) => {
    console.log("Rendering StockScatterPlot with stocks:", stocks);
    // Extrai os dados de fechamento para cada data
    const sortedDates = Object.keys(stocks).sort();
    const closeData: { x: Date; y: number }[] = sortedDates.map((date) => ({
        x: new Date(date),
        y: Number(stocks[date]["4. close"]),
    }));
    const movingAverageData: { x: Date; y: number }[] = calculateMovingAverage(
        closeData,
        10
    );

    console.log(movingAverageData);

    const data: any = {
        datasets: [
            {
                type: "scatter" as const,
                label: "Close Price",
                data: closeData,
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                type: "line" as const,
                label: "Moving Average (10 days)",
                data: movingAverageData,
                borderColor: "rgba(239, 68, 68, 1)",
                backgroundColor: "rgba(239, 68, 68, 0.5)",
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
                tension: 0.1,
                showLine: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: "time" as const,
                time: {
                    unit: "day" as const,
                    tooltipFormat: "MMM dd, yyyy",
                },
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: "Price ($)",
                },
            },
        },
        plugins: {
            legend: {
                position: "top" as const,
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
            },
        },
        interaction: {
            mode: "nearest" as const,
            axis: "x" as const,
            intersect: false,
        },
    };

    return (
        <div className="relative h-96 w-full p-4 rounded-lg shadow-md">
            <Scatter data={data} options={options} />
        </div>
    );
};
