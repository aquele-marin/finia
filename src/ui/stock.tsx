import { useStreamContext } from "@langchain/langgraph-sdk/react-ui";
import { Box } from "@radix-ui/themes";

interface StockProps {
    symbol: string;
}

export const Stock = ({ symbol }: StockProps) => {
    return (
        <Box height="full" className="w-1/3 h-1/3 bg-blue-500">
            <div className="flex justify-center items-center h-full w-full">
                {symbol}
            </div>
        </Box>
    );
};
