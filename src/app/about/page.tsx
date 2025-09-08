import { Heading, Text, Box, Separator } from "@radix-ui/themes";

export default function AboutMe() {
    return (
        <Box maxWidth="64rem" mx="auto" py="6">
            <Heading size="8" mb="4">
                # About Me
            </Heading>
            <Text as="p" size="4" mb="4">
                Hi, I'm Marin, a passionate software engineer focused on
                building robust, scalable, and delightful digital products. I
                love working with modern web technologies, especially React,
                TypeScript, and Python. My interests include AI, developer
                experience, and open source.
            </Text>
            <Separator my="4" />
            <Heading size="6" mb="2">
                ## Skills
            </Heading>
            <ul style={{ marginBottom: 24, fontSize: 18, lineHeight: 1.6 }}>
                <li>React, Next.js, TypeScript</li>
                <li>Python, Flask, FastAPI</li>
                <li>AI/ML, LangChain, LLMs</li>
                <li>UI/UX, Radix UI, Tailwind CSS</li>
                <li>Cloud, Docker, CI/CD</li>
            </ul>
            <Separator my="4" />
            <Heading size="6" mb="2">
                ## Contact
            </Heading>
            <Text as="p" size="3">
                Feel free to reach out via{" "}
                <a
                    href="mailto:gabrielvbmarin21@gmail.com"
                    className="text-blue-500 hover:underline"
                >
                    email
                </a>{" "}
                or connect on{" "}
                <a
                    href="https://github.com/aquele-marin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    GitHub
                </a>
                .
            </Text>
        </Box>
    );
}
