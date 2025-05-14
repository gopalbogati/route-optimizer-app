import React, { useState } from 'react';

const Card = ({ children, className = "" }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-lg ${className}`}>
        {children}
    </div>
);

const CardContent = ({ children }) => (
    <div className="text-gray-800">
        {children}
    </div>
);

const Button = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    >
        {children}
    </button>
);

const Textarea = ({ placeholder, rows, value, onChange, className = "" }) => (
    <textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        className={`w-full p-3 border border-gray-300 rounded-lg mb-4 ${className}`}
    />
);

const Switch = ({ checked, onChange, className = "" }) => (
    <label className={`flex items-center cursor-pointer ${className}`}>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="mr-2"
        />
        <span>{checked ? "On" : "Off"}</span>
    </label>
);

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
                    />
                    <div className="flex items-center mb-4">
                        <Switch checked={roundTrip} onChange={() => setRoundTrip(!roundTrip)} />
                        <span className="ml-2">Return to Starting Point</span>
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
