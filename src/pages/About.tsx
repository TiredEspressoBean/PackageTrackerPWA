import { Header } from "@/components/Header/Header";
import { Box, Divider, Paper, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

export function About() {
    const [carriers, setCarriers] = useState<string[]>([]);
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchCarriers = async () => {
        try {
            const response = await axios.get(`${API_URL}/carriers/`);
            setCarriers(response.data.carriers || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCarriers();
    }, []);

    return (
        <>
            <Header />
            <Box maw={800} mx="auto" mt="xl" px="md">
                <Paper withBorder shadow="sm" radius="md" p="xl">
                    <Title order={2}>About this App</Title>
                    <Text mt="md">
                        Hi there, I'm Cameron and I'm the developer of this app.
                    </Text>
                    <Text mt="md">
                        This app was made for me to learn about how to make a full-fledged web app that works on Android,
                        iOS, and the web. The goal is to solve a common problem: the challenge of keeping track of shipments.
                    </Text>
                    <Divider my="lg" />

                    <Text mt="md">
                        <strong>Features:</strong><br />
                        - Real-time package tracking<br />
                        - Automatic updates every 5 minutes<br />
                        - Support for multiple carriers<br />
                        - Quick carrier identification based on tracking number
                    </Text>
                    <Divider my="lg" />

                    <Text mt="md">
                        <strong>Carriers supported:</strong><br />
                        {carriers
                            .filter(carrier => carrier.trim() !== "")
                            .join(", ")}
                    </Text>
                    <Divider my="lg" />

                    <Text mt="md">
                        <strong>Future Roadmap</strong>
                    </Text>
                    <Text mt="md">
                        The future development of this app depends on my available time, as I am currently in school and working.
                        Building an app of this scope could really benefit from a dedicated team, so consider this list a wishlist,
                        not a planned timeline. However, with enough support, I may be able to devote more time to making the app
                        what you envision.
                    </Text>

                    <Text mt="md">
                        <strong>Wishlist:</strong><br />
                        - Add webhooks for instant tracking updates (may require funding per tracking number)<br />
                        - Subscription plan for an ad-free experience<br />
                        - Community voting on new features<br />
                        - Business support, including white-label options, CSV uploads, and potentially email or text notifications
                    </Text>
                </Paper>
            </Box>
        </>
    );
}
