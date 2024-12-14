import { useEffect } from 'react';
import { AptosConfig } from "@aptos-labs/ts-sdk";


export default function AptosClient() {
    useEffect(() => {
        const fetchAptosConfig = async () => {
            try {
                const { AptosConfig } = await import("@aptos-labs/ts-sdk");
                // Your subsequent logic here
            } catch (error) {
                console.error("Failed to import AptosConfig:", error);
            }
        };

        fetchAptosConfig();
    }, []); // Empty dependency array if you want this to run once on mount

    // Rest of your component
}