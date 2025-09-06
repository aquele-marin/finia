"use client";

import {
    Box,
    Flex,
    Grid,
    IconButton,
    Skeleton,
    TextField,
} from "@radix-ui/themes";
import { useStream } from "@langchain/langgraph-sdk/react";
import { LoadExternalComponent } from "@langchain/langgraph-sdk/react-ui";
import { Stock } from "@/ui";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const AI_API_URL = process.env.NEXT_PUBLIC_LANGGRAPH_URL;

export default function Home() {
    const thread = useStream({
        apiUrl: AI_API_URL,
        assistantId: "agent",
    });

    const ui: any = thread.values.ui ? thread.values.ui : [];

    // To render components from react, pass this object to components props
    const clientComponents: any = {
        stock: Stock,
    };

    return (
        <div className="h-full w-2/4 flex flex-col justify-center items-center">
            <div className={`flex flex-col w-full h-5/6 items-center`}>
                {ui.map((ui: any) => (
                    <LoadExternalComponent
                        key={ui.id}
                        stream={thread}
                        message={ui}
                        components={clientComponents}
                        namespace="agent"
                        fallback={<div>Loading...</div>}
                    />
                ))}
                <Skeleton loading={thread.isLoading}>
                    <div
                        className={`w-128 h-64 ${
                            thread.isLoading ? "" : "hidden"
                        }`}
                    >
                        a
                    </div>
                </Skeleton>
            </div>
            <Flex maxWidth="600px" className="mt-4">
                <TextField.Root
                    placeholder={
                        ui.length >= 3
                            ? "Limit reached"
                            : thread.isLoading
                            ? "Loading..."
                            : "Ask me anything about stocks..."
                    }
                    size="3"
                    className="w-128"
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            const newMessage = {
                                type: "human",
                                content: event.currentTarget.value,
                            };
                            thread.submit({ messages: [newMessage] });

                            event.currentTarget.value = "";
                        }
                    }}
                    disabled={
                        ui.length >= 3 ? true : thread.isLoading ? true : false
                    }
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            </Flex>
        </div>
    );
}
