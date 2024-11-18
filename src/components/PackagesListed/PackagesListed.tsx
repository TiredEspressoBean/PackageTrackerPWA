import {Group, Paper, rem, Select, SimpleGrid, Text} from "@mantine/core";
import {TrackingCard} from '../TrackingCard/TrackingCard';
import {useEffect} from "react";

interface PackagesListedProps {
    trackingData: any[];
    sortOption: string | null;
    setSortOption: (option: string | null) => void;
    handleUpdate: (trackingNumber: string, selectedCarrier: string) => void;
    handleRemove: (trackingNumber: string) => void;
}

export function PackagesListed({
                                   trackingData,
                                   sortOption,
                                   setSortOption,
                                   handleUpdate,
                                   handleRemove,
                               }: PackagesListedProps) {


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (document.visibilityState === "visible") {
                trackingData.forEach(item => {
                    handleUpdate(item.trackingNumber, item.selectedCarrier);
                })
            }
        }, 300000)
        return () => clearInterval(intervalId)
    }, [trackingData, handleUpdate]);

    return (
        <Paper maw={rem(800)} mx="auto" withBorder p="xl">
            <Group justify="space-between">
                <Select
                    placeholder="Sort by:"
                    value={sortOption}
                    onChange={setSortOption}
                    data={[
                        {value: "carrier", label: "Carrier"},
                        {value: "expectedDeliveryDate", label: "Estimated Delivery"},
                    ]}
                />
                {trackingData.length > 6 && (
                    <Text>
                        {trackingData.length}/10 Packages Saved
                    </Text>
                )}
            </Group>
            <SimpleGrid spacing="lg" mt="md">
                {trackingData.map((item) => (
                    <TrackingCard
                        key={item.trackingNumber}
                        trackingNumber={item.trackingNumber}
                        carrier={item.carrier}
                        expectedDeliveryDate={item.expectedDeliveryDate}
                        estimatedDeliveryTime={item.estimatedDeliveryTime}
                        status={item.currentStatus}
                        history={item.history}
                        onUpdate={() => handleUpdate(item.trackingNumber, item.carrier)}
                        handleRemove={() => handleRemove(item.trackingNumber)}
                    />
                ))}
            </SimpleGrid>
        </Paper>
    );
}
