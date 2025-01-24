import * as React from 'react';
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import { JSX, useState, useEffect } from 'react'

interface IMappedinProps {
    onDataChange: () => void;
}

function MyCustomComponent() {
	const { mapData } = useMap();

	return (
        <>
            {mapData.getByType('space').map((space) => (
                <Label key={space.id} target={space.center} text={space.name} />
            ))}
        </>
    );
}

export const MappedinControl = (props: IMappedinProps): JSX.Element => {
    console.log("MappedinControl");

    const [mapId] = useState("6686b845c9f6d6000bc30300");
    const [mapKey] = useState("mik_yeBk0Vf0nNJtpesfu560e07e5");
    const [mapSecret] = useState("mis_2g9ST8ZcSFb5R9fPnsvYhrX3RyRwPtDGbMGweCYKEq385431022");
    const { isLoading, error, mapData } = useMapData({
        key: mapKey,
        secret: mapSecret,
        mapId: mapId,
    });

    console.log("Loading state:", isLoading);
    console.log("Error state:", error);
    console.log("Map data:", mapData);

    useEffect(() => {
        console.log('useEffect triggered', { isLoading, mapData, error });

        if (!isLoading && mapData) {
            props.onDataChange();
        }
    }, [isLoading, mapData, error, props.onDataChange]);

    if (error) {
        return <div>Error loading map data. Please try again later.</div>;
    }

    if (isLoading) {
        return <div>Loading map data...</div>;
    }

    console.log("Map loaded");

    return (
        <div style={{ width: "100%", height: "500px" }}>
            {mapData ? (
                <MapView mapData={mapData}>
                    <MyCustomComponent />
                </MapView>
            ) : null}
        </div>
    );
};
