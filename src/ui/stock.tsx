interface StockProps {
    symbol: string;
}

export const Stock = ({ symbol }: StockProps) => {
    return <div className="bg-red-500">symbol: {symbol}</div>;
};
