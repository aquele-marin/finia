"use client";

import { Box, Flex, Grid, IconButton, TextField } from "@radix-ui/themes";
import { useStream } from "@langchain/langgraph-sdk/react";
import { LoadExternalComponent } from "@langchain/langgraph-sdk/react-ui";
import { Stock } from "@/ui";

export default function Home() {
    const items = [
        { id: 1, content: "Hello World" },
        { id: 2, content: "Hello World" },
        { id: 3, content: "Hello Wodadarld" },
        { id: 4, content: "Hello dasdasdWorld" },
    ];

    const thread = useStream({
        apiUrl: "http://localhost:2024",
        assistantId: "agent",
    });

    const { ui }: any = thread.values;

    // To render components from react, pass this object to components props
    const clientComponents: any = {
        stock: Stock,
    };

    console.log("THREAD: ", thread);
    console.log("UI: ", ui);
    // Função para determinar as classes do container e dos itens com base na contagem.
    const getGridClasses = (count: number) => {
        if (count <= 1) {
            return {
                container: "flex",
                item: "h-full w-full",
            };
        }
        if (count === 2) {
            return {
                container: "flex",
                item: "h-full w-1/2",
            };
        }
        if (count === 3 || count === 4) {
            return {
                container: "flex flex-wrap",
                item: "h-1/2 w-1/2",
            };
        }
        // Para um número maior de itens, calculamos a dimensão da grade mais próxima de um quadrado.
        const gridDimension = Math.ceil(Math.sqrt(count));
        let itemWidthClass = "";
        let itemHeightClass = "";

        // Mapeamento para classes do Tailwind.
        switch (gridDimension) {
            case 3: // Para 5 a 9 itens
                itemWidthClass = "w-1/3";
                itemHeightClass = "h-1/3";
                break;
            case 4: // Para 10 a 16 itens
                itemWidthClass = "w-1/4";
                itemHeightClass = "h-1/4";
                break;
            default: // Fallback para outros casos
                itemWidthClass = "w-1/5";
                itemHeightClass = "h-1/5";
                break;
        }

        return {
            container: "flex flex-wrap",
            item: `${itemWidthClass} ${itemHeightClass}`,
        };
    };

    const { container, item } = getGridClasses(items.length);
    return (
        <div className="h-full w-2/4 bg-green-400 flex flex-col justify-center items-center">
            <div className={`${container} bg-yellow-500 w-full h-5/6`}>
                {items.map((_item) => (
                    <Box
                        key={_item.id}
                        height="full"
                        className={`${item} bg-blue-500`}
                    >
                        <div className="flex justify-center items-center h-full w-full">
                            {_item.content}
                        </div>
                    </Box>
                ))}
            </div>
            <Flex maxWidth="600px" className="bg-black mt-4">
                {thread.messages.map((message: any) => (
                    <div key={message.id} className="text-white">
                        {message.content}
                        {ui
                            .filter(
                                (ui: any) =>
                                    ui.metadata?.message_id === message.id
                            )
                            .map((ui: any) => (
                                <LoadExternalComponent
                                    key={ui.id}
                                    stream={thread}
                                    message={ui}
                                    components={clientComponents}
                                    namespace="agent"
                                />
                            ))}
                    </div>
                ))}
                <button
                    onClick={() => {
                        const newMessage = {
                            type: "human",
                            content: `What's the stock for Apple?`,
                        };

                        thread.submit({ messages: [newMessage] });
                    }}
                >
                    Submit something
                </button>
                {/* <TextField.Root
                    placeholder="Search the docs…"
                    size="2"
                    className="w-128"
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root> */}
            </Flex>
        </div>
    );
}
