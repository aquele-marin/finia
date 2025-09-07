"use client";

import { LoadExternalComponent } from "@langchain/langgraph-sdk/react-ui";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
    Card,
    Flex,
    Popover,
    IconButton,
    Box,
    TextArea,
    Button,
    Tooltip as ToolTip,
    Skeleton,
} from "@radix-ui/themes";
import { Stock } from "./stock";
import { useStream } from "@langchain/langgraph-sdk/react";
import { useEffect, useState } from "react";

const AI_API_URL = process.env.NEXT_PUBLIC_LANGGRAPH_URL;

interface AIComponentProps {
    id: number;
    content: string;
}

export function AIComponent({ content, id }: AIComponentProps) {
    const [message, setMessage] = useState<string>(content);
    const thread = useStream({
        apiUrl: AI_API_URL,
        assistantId: "agent",
    });

    const clientComponents: any = {
        stock: Stock,
    };

    const ui: any = thread.values.ui ? thread.values.ui : [];

    useEffect(() => {
        handleSubmit(message);
    }, []);

    const handleSubmit = (newMessage: string) => {
        const userMessage = {
            type: "human",
            content: newMessage,
        };
        thread.submit({ messages: [userMessage] });
    };

    return thread.isLoading || ui.length == 0 ? (
        <Skeleton loading={thread.isLoading}>
            <div className="w-128 h-64">a</div>
        </Skeleton>
    ) : (
        <Card>
            <Flex align="center" gap="2" mb="2">
                <Popover.Root>
                    <ToolTip content="Query over this">
                        <Popover.Trigger>
                            <IconButton size="1" variant="ghost">
                                <MagnifyingGlassIcon />
                            </IconButton>
                        </Popover.Trigger>
                    </ToolTip>
                    <Popover.Content side="bottom">
                        <Flex gap="3">
                            <Box flexGrow="1">
                                <TextArea
                                    placeholder="Write a comment…"
                                    style={{ height: 80 }}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <Box mt="3">
                                    <Popover.Close>
                                        <Button
                                            size="1"
                                            onClick={() => {
                                                // Handle the query submission here
                                                handleSubmit(message);
                                            }}
                                        >
                                            Send
                                        </Button>
                                    </Popover.Close>
                                </Box>
                            </Box>
                        </Flex>
                    </Popover.Content>
                </Popover.Root>

                <Box width={"30rem"} className="break-words">
                    {ui[ui.length - 1].props.message}
                </Box>
            </Flex>
            <LoadExternalComponent
                stream={thread}
                message={ui[ui.length - 1]}
                components={clientComponents}
                namespace="agent"
                fallback={<div>Loading...</div>}
            />
        </Card>
    );
}
