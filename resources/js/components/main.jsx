import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/main.css';

export default function Main() {
  const mapRef = useRef(null);

    useEffect(() => {
        // Inisialisasi peta
        const map = L.map(mapRef.current).setView([-6.2088, 106.8456], 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Lokasi banjir
        const floodLocations = [
            { latlng: [-6.138414, 106.863956], city: "Jakarta Utara", count: 8 },
            { latlng: [-6.1615, 106.7570], city: "Jakarta Barat", count: 15 },
            { latlng: [-6.225014, 106.900447], city: "Jakarta Timur", count: 3 },
            { latlng: [-6.261493, 106.810600], city: "Jakarta Selatan", count: 4 }
        ];

        // Detail lokasi untuk setiap kota
        const cityDetails = {
            "Jakarta Barat": [
              { latlng: [-6.140227, 106.7235353], kelurahan: "Cengkareng Barat", indeksBanjir: 1.8, Kategori: "Sedang"},
              { latlng: [-6.1416616, 106.7328601], kelurahan: "Cengkareng Timur", indeksBanjir: 1.6, Kategori: "Sedang" },
              { latlng: [-6.16888, 106.71605], kelurahan: "Duri Kosambi", indeksBanjir: 1.8, Kategori: "Sedang" },
              { latlng: [-6.13983, 106.75331], kelurahan: "Kapuk", indeksBanjir: 1.6, Kategori: "Sedang" },
              { latlng: [-6.1511336, 106.7575653], kelurahan: "Kedaung Kali Angke", indeksBanjir: 1.6, Kategori: "Sedang" },
              { latlng: [-6.16122, 106.73901], kelurahan: "Rawa Buaya" , indeksBanjir: 2.2, Kategori: "Tinggi" },
              { latlng: [-6.1489448, 106.7823051], kelurahan: "Jelambar Baru", indeksBanjir: 1.6, Kategori: "Sedang" },
              { latlng: [-6.17116, 106.78476], kelurahan: "Tanjung Duren Utara", indeksBanjir: 1.6, Kategori: "Sedang" },
              { latlng: [-6.16684, 106.70250], kelurahan: "Semanan", indeksBanjir: 1.6, Kategori: "Sedang" },
              { latlng: [-6.1198254, 106.718693], kelurahan: "Tegal Alur", indeksBanjir: 1.8, Kategori: "Sedang" },
              { latlng: [-6.18190, 106.75909], kelurahan: "Kedoya Selatan", indeksBanjir: 1.6, Kategori: "Sedang" },
              { latlng: [-6.16781, 106.76152], kelurahan: "Kedoya Utara", indeksBanjir: 1.8, Kategori: "Sedang" },
              { latlng: [-6.21895, 106.73918], kelurahan: "Joglo", indeksBanjir: 1.6, Kategori: "Sedang" },
              { latlng: [-6.18999, 106.73647], kelurahan: "Kembangan Selatan", indeksBanjir: 2.0, Kategori: "Tinggi"},
              { latlng: [-6.17179, 106.74394], kelurahan: "Kembangan Utara", indeksBanjir: 2.0, Kategori: "Tinggi" }
            ],
            "Jakarta Utara": [
              { latlng: [-6.12292, 106.92662], kelurahan: "Semper Barat", indeksBanjir: 1.8, Kategori: "Sedang" },
              { latlng: [-6.12093, 106.93517], kelurahan: "Semper Timur", indeksBanjir: 1.8, Kategori: "Sedang" },
              { latlng: [-6.15233, 106.92796], kelurahan: "Sukapura", indeksBanjir: 1.8, Kategori: "Sedang" },
              { latlng: [-6.1626344, 106.9158465], kelurahan: "Pegangsaan Dua", indeksBanjir: 1.6, Kategori: "Sedang" },
              { latlng: [-6.1140999, 106.9116460], kelurahan: "Lagoa", indeksBanjir: 1.6, Kategori: "Sedang" },
              { latlng: [-6.1224924, 106.9121406], kelurahan: "Tugu Utara", indeksBanjir: 1.6, Kategori: "Sedang" },
              { latlng: [-6.13550, 106.78545], kelurahan: "Pejagalan", indeksBanjir: 2.2, Kategori: "Tinggi" },
              { latlng: [-6.125643, 106.800759], kelurahan: "Penjaringan", indeksBanjir: 1.8, Kategori: "Sedang" }
            ],
            "Jakarta Timur": [
              { latlng: [-6.23471, 106.86651], kelurahan: "Bidara Cina", indeksBanjir: 2.4, Kategori: "Tinggi" },
              { latlng: [-6.21850, 106.86132], kelurahan: "Kampung Melayu", indeksBanjir: 2.2, Kategori: "Tinggi" },
              { latlng: [-6.19978, 106.90110], kelurahan: "Jatinegara Kaum", indeksBanjir: 1.6, Kategori: "Tinggi" }
            ],
            "Jakarta Selatan": [
              { latlng: [-6.23404, 106.82440], kelurahan: "Kuningan Barat", indeksBanjir: 1.8, Kategori: "Sedang" },
              { latlng: [-6.25085, 106.82211], kelurahan: "Mampang Prapatan", indeksBanjir: 1.8, Kategori: "Sedang" },
              { latlng: [-6.24694, 106.81625], kelurahan: "Pela Mampang", indeksBanjir: 1.8, Kategori: "Sedang" },
              { latlng: [-6.25884, 106.85500], kelurahan: "Rawajati", indeksBanjir: 2.0, Kategori: "Tinggi" }
            ]
        };

        let detailMarkers = [];
        let currentCity = null;

        const toggleCityDetails = (city) => {
            if (currentCity === city) {
                hideDetails();
                map.setView([-6.2088, 106.8456], 11);
                currentCity = null;
            } else {
                hideDetails();
                showDetails(city);
                currentCity = city;
            }
        };

        const showDetails = (city) => {
            const cityCenter = floodLocations.find(loc => loc.city === city).latlng;
            map.setView(cityCenter, 14);

            detailMarkers = cityDetails[city].map(location => {
                const marker = L.circleMarker(location.latlng, {
                    radius: 7,
                    fillColor: location.indeksBanjir >= 2.0 ? "#FF0000" : "#FFA500",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).addTo(map).bindPopup(
                    `<strong>Kelurahan:</strong> ${location.kelurahan}<br>
                    <strong>Indeks Banjir:</strong> ${location.indeksBanjir}<br>
                    <strong>Kategori:</strong> ${location.Kategori}`
                );

                return marker;
            });
        };

        const hideDetails = () => {
            detailMarkers.forEach(marker => map.removeLayer(marker));
            detailMarkers = [];
        };

        floodLocations.forEach(location => {
            const marker = L.circleMarker(location.latlng, {
                radius: 9,
                fillColor: "#3388ff",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map).bindPopup(
                `<strong>Kota:</strong> ${location.city}<br>
                <strong>Total Lokasi Banjir:</strong> ${location.count}`
            );

            marker.on('click', () => toggleCityDetails(location.city));
        });

        return () => {
            map.remove(); // Clean up the map on component unmount
        };
    }, []);

    return <div id="map" ref={mapRef} className='flex justify-center items-center h-100% m-0 p-0' />;
}