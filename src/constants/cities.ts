export type CityMarker = {
    id: string;
    name: string;
    location: [number, number];
};

export const HUB_LOCATION: [number, number] = [41.01, 28.98];

export const CITIES: CityMarker[] = [
    { id: "ist", name: "İstanbul", location: [41.01, 28.98] },
    { id: "ank", name: "Ankara", location: [39.93, 32.86] },
    { id: "izm", name: "İzmir", location: [38.42, 27.14] },
    { id: "ant", name: "Antalya", location: [36.9, 30.71] },
    { id: "bur", name: "Bursa", location: [40.19, 29.06] },
    { id: "kon", name: "Konya", location: [37.87, 32.49] },
    { id: "ada", name: "Adana", location: [37.0, 35.32] },
    { id: "gaz", name: "Gaziantep", location: [37.07, 37.38] },
    { id: "tra", name: "Trabzon", location: [41.0, 39.72] },
    { id: "kay", name: "Kayseri", location: [38.73, 35.49] },
];
