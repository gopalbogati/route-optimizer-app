import React, { useState } from 'react';
import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { Switch } from "./Switch";

const RouteOptimizer = () => {
    const [addresses, setAddresses] = useState("");
    const [googleMapsLink, setGoogleMapsLink] = useState("");
    const [roundTrip, setRoundTrip] = useState(false);

    const generateRoute = () => {
        const addressList = addresses.split("\n").map(addr => encodeURIComponent(addr.trim())).filter(addr => addr !== "");
        if (addressList.length > 1) {
            let googleMapsURL = `https://www.google.com/maps/dir/${addressList.join('/')}`;
            if (roundTrip) {
                googleMapsURL += `/${addressList[0]}`; // Return to start
            }
            setGoogleMapsLink(googleMapsURL);
        } else {
            alert("Please enter at least two addresses.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <Card className="mb-6">
                <CardContent>
                    <h2 className="text-2xl font-semibold mb-4">Sydney Route Optimizer</h2>
                    <Textarea
                        placeholder="Enter each address on a new line"
                        rows={6}
                        value={addresses}
                        onChange={(e) => setAddresses(e.target.value)}
                        className="mb-4"
                    />
                    <div className="flex items-center mb-4">
                        <Switch checked={roundTrip} onChange={() => setRoundTrip(!roundTrip)} className="mr-2" />
                        <span>Return to Starting Point</span>
                    </div>
                    <Button onClick={generateRoute}>
                        Get Shortest Route
                    </Button>
                </CardContent>
            </Card>
            {googleMapsLink && (
                <Card className="mt-4">
                    <CardContent>
                        <h3 className="text-xl font-semibold">Optimized Route:</h3>
                        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            Open in Google Maps
                        </a>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default RouteOptimizer;
