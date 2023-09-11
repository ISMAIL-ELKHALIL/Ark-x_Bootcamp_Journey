"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url = require("url");
const port = 3000;
const cities = [
    { name: "New York", lat: 40.7128, lng: -74.006 },
    { name: "London", lat: 51.5074, lng: -0.1278 },
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
    { name: "Sydney", lat: -33.8651, lng: 151.2099 },
    { name: "Rome", lat: 41.9028, lng: 12.4964 },
    { name: "Cairo", lat: 30.0444, lng: 31.2357 },
    { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
    { name: "Dubai", lat: 25.2048, lng: 55.2708 },
    { name: "Rabat", lat: 34.0209, lng: -6.8416 },
];
const server = http_1.default.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    if (path === "/weather" && query?.name) {
        const cityName = query.name;
        const city = cities.find((c) => c.name === cityName);
        if (!city) {
            res.writeHead(404);
            res.end("City not found");
            return;
        }
        try {
            const temperature = await getCityTemperature(city);
            if (temperature !== undefined) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ city: cityName, temperature }));
            }
            else {
                res.writeHead(500);
                res.end("Error fetching temperature data");
            }
        }
        catch (error) {
            console.error("Error fetching temperature:", error);
            res.writeHead(500);
            res.end("Error fetching temperature data");
        }
    }
    else {
        res.writeHead(404);
        res.end("Invalid endpoint");
    }
});
server.listen(port, () => {
    console.info("Server is running on Port: ", port);
});
async function getCityTemperature(city) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`);
        const data = await response.json();
        return data.current_weather.temperature;
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}
//# sourceMappingURL=index.js.map