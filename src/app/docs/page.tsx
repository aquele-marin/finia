import { Heading, Text, Box, Separator } from "@radix-ui/themes";

export default function Docs() {
    return (
        <Box maxWidth="64rem" mx="auto" py="6">
            <Heading size="8" mb="4">
                # Docs
            </Heading>
            <Text as="p" size="4" mb="4">
                Welcome to the Finia project documentation. This project is a
                modern, AI-powered platform built with Next.js, Flask, and
                LangChain. Below you'll find an overview of the architecture,
                setup instructions, and usage guidelines.
            </Text>
            <Separator my="4" />
            <Heading size="6" mb="2">
                ## Project Structure
            </Heading>
            <Text as="p" size="3" mb="4">
                finia/ src/app/ # Next.js frontend <br />
                finia-backend/ flaskr/ # Flask backend (API, AI logic) <br />
                langgraph-neo4j/ # Experiments and graph integrations <br />
                langgraph-server/ # LangGraph server setup
            </Text>
            <Separator my="4" />
            <Heading size="6" mb="2">
                ## Getting Started
            </Heading>
            <Text as="p" size="3" mb="2">
                1. Clone the repository
                <br />
                2. Install dependencies with <code>npm install</code> and{" "}
                <code>pip install -r requirements.txt</code>
                <br />
                3. Run the backend:{" "}
                <code>cd finia-backend &amp;&amp; ./run.sh</code>
                <br />
                4. Run the frontend:{" "}
                <code>cd finia &amp;&amp; npm run dev</code>
            </Text>
            <Separator my="4" />
            <Heading size="6" mb="2">
                ## Features
            </Heading>
            <ul style={{ marginBottom: 24 }}>
                <li>Conversational AI</li>
                <li>Modern, minimal UI using Radix UI</li>
                <li>
                    Seamless integration between Next.js, Flask and LangGraph
                </li>
                <li>Extensible with LangChain and custom tools</li>
            </ul>
            <Separator my="4" />
            <Heading size="6" mb="2">
                ## License
            </Heading>
            <Text as="p" size="3">
                MIT License. See <code>LICENSE</code> for details.
            </Text>
        </Box>
    );
}
