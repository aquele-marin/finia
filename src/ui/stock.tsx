import { Box } from "@radix-ui/themes";
import {
    Chart as ChartJS,
    PointElement,
    LineElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    LineController,
    CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface StockProps {
    stocks: Object;
    symbol: string;
    message: string;
}

export const Stock = ({ stocks, symbol, message }: StockProps) => {
    ChartJS.register(
        LinearScale,
        CategoryScale,
        PointElement,
        LineElement,
        LineController,
        Title,
        Tooltip,
        Legend
    );

    const data = {
        labels: Object.keys(stocks).reverse(),
        datasets: [
            {
                label: symbol,
                data: Object.values(stocks)
                    .map((stock: any) => stock["4. close"])
                    .reverse(),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgb(75, 192, 192)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            // title: {
            //     display: true,
            //     text: message,
            // },
        },
    };

    return <Line data={data} options={options} />;
};
