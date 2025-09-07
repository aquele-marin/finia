"use client";

import { Flex, Skeleton, TextField } from "@radix-ui/themes";
import { useStream } from "@langchain/langgraph-sdk/react";
import { AIComponent, Stock } from "@/ui";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Home() {
    const [items, setItems] = useState<any[]>([]);

    function handleSubmit(content: string) {
        const newItem = {
            id: items.length,
            content: content,
        };
        setItems([...items, newItem]);
    }

    return (
        <div className="h-full w-2/4 flex flex-col justify-center items-center">
            <div className={`flex flex-col w-full h-5/6 items-center`}>
                {items.map((item: any) => (
                    <AIComponent key={item.id} {...item} />
                ))}
            </div>
            <Flex maxWidth="600px" className="mt-4">
                <TextField.Root
                    placeholder={
                        items.length >= 3
                            ? "Limit reached"
                            : "Ask me anything about stocks..."
                    }
                    size="3"
                    className="w-128"
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();

                            handleSubmit(event.currentTarget.value);

                            event.currentTarget.value = "";
                        }
                    }}
                    disabled={items.length >= 3 ? true : false}
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            </Flex>
        </div>
    );
}
