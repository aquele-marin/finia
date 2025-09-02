interface StockChartProps {
    stocks: string[];
}

export const Stock = ({ stocks }: StockChartProps) => {
    return <div className="bg-red-500">stocksss: {stocks}</div>;
};
