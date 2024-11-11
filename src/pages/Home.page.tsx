import { useState, useEffect } from 'react';
import { Header } from '@/components/Header/Header';
import { SearchTrackingNumber } from '@/components/SearchTrackingNumber/SearchTrackingNumber';
import { PackagesListed } from '@/components/PackagesListed/PackagesListed';
import { Box } from '@mantine/core';
import axios from 'axios';

export function HomePage() {
    const [trackingData, setTrackingData] = useState<any[]>([]);
    const [sortOption, setSortOption] = useState<string | null>(null);

    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch tracking data from the API
    const fetchTrackingData = async () => {
        try {
            const response = await axios.get(`${API_URL}/packages/`, { withCredentials: true });
            console.log("Fetched tracking data:", response.data);
            if (Array.isArray(response.data) && response.data.length > 0) {
                setTrackingData(response.data);
            } else {
                console.warn("Fetched data is empty or in an unexpected format.");
            }
        } catch (error) {
            console.error("Error fetching tracking data:", error);
        }
    };

    // Add a new package to the state
    const handlePackageAdded = (newPackage: any) => {
        const formattedPackage = newPackage.trackingData;
        console.log(formattedPackage);
        setTrackingData(prevTrackingData => [...prevTrackingData, formattedPackage]);
    };

    // Update an existing package
    const handleUpdate = async (trackingNumber: string, selectedCarrier:string) => {
        try {
            await axios.post(`${API_URL}/packages/track`, {
                trackingNumber,
                carrier: selectedCarrier,
            }, {withCredentials:true});
            await fetchTrackingData();
        } catch (error) {
            console.error("Error updating tracking number:", error);
        }
    };

    const handleRemove = async (trackingNumber: string) => {
        setTrackingData(
            (prevData) => prevData.filter(pkg => pkg.trackingNumber !== trackingNumber)
        );
    }

    // Sorting logic
    const sortedData = [...trackingData].sort((a, b) => {
        switch (sortOption) {
            case "carrier":
                return a.carrier.localeCompare(b.carrier);
            case "expectedDeliveryDate":
                return new Date(a.expectedDeliveryDate).getTime() - new Date(b.expectedDeliveryDate).getTime();
            default:
                return 0;
        }
    }).map(item => {
        const expectedDate = item.expectedDeliveryDate ? new Date(item.expectedDeliveryDate) : null;
        const formattedDate = expectedDate ? expectedDate.toLocaleDateString() : "No delivery estimate";
        const formattedTime = expectedDate
            ? new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZoneName: 'short'
            }).format(expectedDate)
            : "";

        return {
            ...item,
            expectedDeliveryDate: formattedDate,
            estimatedDeliveryTime: formattedTime,
        };
    });

    useEffect(() => {
        fetchTrackingData();
    }, []);

    return (
        <>
            <Header />
            <Box>
                <SearchTrackingNumber postPackages={handlePackageAdded} />
                <PackagesListed
                    trackingData={sortedData}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    handleUpdate={handleUpdate}
                    handleRemove={handleRemove}
                />
            </Box>
        </>
    );
}
