import {ActionIcon, Box, Group, NativeSelect, rem, TextInput} from "@mantine/core";
import axios from 'axios';
import {useEffect, useState} from "react";
import {TbSearch, TbChevronDown} from "react-icons/tb";

interface SearchTrackingNumberProps {
    postPackages: (newPackage: any) => void;
}

export function SearchTrackingNumber({postPackages}: SearchTrackingNumberProps) {
    const [carriers, setCarriers] = useState<string[]>([]);
    const [trackingNumber, setTrackingNumber] = useState("");
    const [selectedCarrier, setSelectedCarrier] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchCarriers = async () => {
        try {
            const response = await axios.get(`${API_URL}/carriers/`, {withCredentials:true});
            setCarriers(response.data.carriers || []);
        } catch (error) {
            console.error(error);
        }
    };

    const postTrackingNumber = async () => {
        if (!trackingNumber) {
            // eslint-disable-next-line no-alert
            alert("Please and enter a tracking number.");
            return;
        }
        try {
            const postPackage = await axios.post(`${API_URL}/packages/track`, {
                trackingNumber,
                carrier: selectedCarrier,
            }, {withCredentials: true});
            // Call the parent function to update the list of packages
            postPackages(postPackage.data); // Assuming the response contains the new package data
        } catch (error) {
            // @ts-ignore
            if (error.response.data.message === "Unknown Carrier") {
                // eslint-disable-next-line no-alert
                alert("Sorry, we couldn't detect the carrier. Please use the dropdown menu if you know the carrier," +
                    "or check if the carrier is one that we support.")
            }
            // @ts-ignore
            if (error.response.data.message === "Too many packages to this user") {
                // eslint-disable-next-line no-alert
                alert("Sorry, you have too many packages currently being tracked. Try deleting ones that have already" +
                    "been delivered. ")
            }
            console.error(error);
        }
    };


    const search = (
        <ActionIcon onClick={postTrackingNumber} aria-label="Execute carrier search">
            <TbSearch size={20}/>
        </ActionIcon>
    );

    useEffect(() => {
        fetchCarriers();
    }, []);

    return (
        <Box maw={rem(400)} mx="auto" mb={rem(10)}>
            <Group>
                <NativeSelect
                    data={carriers}
                    label="Choose your carrier"
                    value={selectedCarrier}
                    rightSection={<TbChevronDown/>}
                    onChange={(e) => setSelectedCarrier(e.currentTarget.value)}
                    styles={{
                        input: {
                            fontWeight: 500,
                            borderTopRightRadius: 3,
                            borderBottomRightRadius: 3,
                            width: rem(100),
                            marginLeft: rem(-2),
                            marginRight: rem(2),
                        },
                    }}
                />
                <TextInput
                    placeholder="ZN15444098"
                    label="Search Tracking Number"
                    leftSectionWidth={100}
                    rightSection={search}
                    onChange={(e) => setTrackingNumber(e.currentTarget.value)}
                /></Group>
        </Box>
    );
}
