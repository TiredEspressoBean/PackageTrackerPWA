import {useState} from "react";
import {ActionIcon, Badge, Button, Card, Group, Text, Title, Divider, Stack} from "@mantine/core";
import {TbChevronDown, TbChevronUp, TbTruck, TbCalendar, TbTrashXFilled} from "react-icons/tb";
import axios from "axios";

interface HistoryEvent {
    eventDescription: string;
    date: string;
    location: string;
    delayDetail?: string | null;
}

interface TrackingCardProps {
    trackingNumber: string,
    carrier: string,
    expectedDeliveryDate: string,
    estimatedDeliveryTime?: string,
    status: string,
    history?: HistoryEvent[],
    onUpdate: () => void,
    handleRemove: () => void
}

export function TrackingCard({
                                 trackingNumber,
                                 carrier,
                                 expectedDeliveryDate,
                                 estimatedDeliveryTime,
                                 status,
                                 history = [],
                                 onUpdate,
                                 handleRemove
                             }: TrackingCardProps) {

    const [expanded, setExpanded] = useState<boolean>(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const toggleExpanded = () => setExpanded(!expanded);

    const deletePackage = async (trackingNumber: string) => {
        setExpanded(false)
        try {
            handleRemove();
            const payload = {
                trackingNumber,
            }
            const deleteResponse = await axios.delete(
                `${API_URL}/packages/`,
                {
                    data: payload,
                    withCredentials: true
                }
            );
            if (deleteResponse.status === 200) {
                console.log("Something")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card withBorder onClick={toggleExpanded} shadow="sm" padding="md"
              style={{transition: '0.2s', cursor: 'pointer'}}>
            <Group justify="space-between" align="center">
                <Stack>
                    <Group>
                        <Title order={4}>{trackingNumber}</Title>
                    </Group>
                    <Group mt="sm" align="center">
                        <TbTruck size={16} color="#888"/>
                        <Text color="dimmed" size="sm">{carrier}</Text>
                    </Group>
                </Stack>
                <Stack>
                    <Badge color={status === "Delivered" ? "green" : "yellow"} size="sm">
                        {status}
                    </Badge>
                    <Group>
                        <TbCalendar size={16} color="#888"/>
                        <Text color="dimmed" size="sm">
                            Est.
                            Delivery: {expectedDeliveryDate} {estimatedDeliveryTime && `at ${estimatedDeliveryTime}`}
                        </Text>
                    </Group>
                </Stack>
                <Group>
                    <ActionIcon variant="light" style={{right: '1rem'}} size="xl">
                        {expanded ? <TbChevronUp/> : <TbChevronDown/>}
                    </ActionIcon>
                    <ActionIcon variant="light" color="red" size="xl" onClick={() => deletePackage(trackingNumber)}>
                        <TbTrashXFilled/>
                    </ActionIcon>
                </Group>
            </Group>


            {expanded && (
                <>
                    <Divider my="sm"/>

                    <Stack>
                        {history.length > 0 ? (
                            history.map((event, index) => (
                                <Group key={index} align="flex-start">
                                    <Text size="sm" color="dimmed">
                                        {new Date(event.date).toLocaleString()} - {event.location}
                                    </Text>
                                    <Text size="sm">{event.eventDescription}</Text>
                                    {event.delayDetail && (
                                        <Text size="xs" color="red">
                                            Delay: {event.delayDetail}
                                        </Text>
                                    )}
                                </Group>
                            ))
                        ) : (
                            <Text size="sm" color="dimmed">
                                No history available.
                            </Text>
                        )}
                    </Stack>

                    <Button fullWidth variant="outline" color="blue" mt="md" onClick={onUpdate}>
                        Force Update Status
                    </Button>
                </>
            )}
        </Card>
    );
}
