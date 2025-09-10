"use client";

import { Flex, Skeleton, TextField, Box } from "@radix-ui/themes";
import { AIComponent } from "@/ui";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Home() {
    const [items, setItems] = useState<any[]>([]);
    const CHART_LIMIT = 6;

    function handleSubmit(content: string) {
        const newItem = {
            id: items.length,
            content: content,
        };
        setItems([...items, newItem]);
    }

    return (
        <div className="h-5/6 w-3/5 flex flex-col justify-between items-center overflow-hidden">
            <div className="w-full flex flex-wrap gap-2">
                {items.map((item: any) => (
                    <AIComponent key={item.id} {...item} />
                ))}
            </div>

            <Flex maxWidth="600px" className="mt-4">
                <TextField.Root
                    placeholder={
                        items.length >= CHART_LIMIT
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
                    disabled={items.length >= CHART_LIMIT ? true : false}
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            </Flex>
        </div>
    );
}
