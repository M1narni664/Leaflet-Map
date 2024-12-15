import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map!: L.Map;
  marker!: L.Marker;
  osmLayer!: L.TileLayer;
  darkModeLayer!: L.TileLayer;
  humanitarianLayer!: L.TileLayer;
  topoLayer!: L.TileLayer;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    if (!this.map) {
      this.initializeMap();
    }
  }

  initializeMap() {
    // Initialize map and set view
    this.map = L.map('mapId').setView([-6.31060, 106.82026], 15);

    // Initialize basemaps
    this.osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    this.darkModeLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
      maxZoom: 19
    });

    this.humanitarianLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; Humanitarian OSM Team',
      maxZoom: 19
    });

    this.topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenTopoMap contributors',
      maxZoom: 17
    });

    // Example data for hospitals
    const hospitals = [
      { name: 'RS Cipto Mangunkusumo', lat: -6.1767, lng: 106.8302 },
      { name: 'RSUD Pasar Rebo', lat: -6.2865, lng: 106.8772 },
      { name: 'RSPI Sulianti Saroso', lat: -6.1351, lng: 106.8259 },
      { name: 'RSUP Dr. Sardjito', lat: -7.7736, lng: 110.3590 },
      { name: 'RSUP Dr. Wahidin Sudirohusodo', lat: -5.1343, lng: 119.4139 },
      { name: 'RS Umum Pusat', lat: -6.3474, lng: 106.8320 },
      { name: 'RS Mampang Prapatan', lat: -6.2794, lng: 106.8441 },
      { name: 'RS Medistra', lat: -6.2345, lng: 106.8347 },
      { name: 'RS Tarakan', lat: -6.1934, lng: 106.8264 },
      { name: 'RS Mitra Keluarga', lat: -6.2487, lng: 106.8314 },
      { name: 'RS Hermina', lat: -6.2112, lng: 106.8042 },
      { name: 'RS Pondok Indah', lat: -6.2523, lng: 106.7521 },
      { name: 'RS Setia Mitra', lat: -6.2622, lng: 106.8694 },
      { name: 'RS Siloam', lat: -6.2593, lng: 106.8205 },
      { name: 'RS Kanker Dharmais', lat: -6.1829, lng: 106.8050 },
      { name: 'RS Pusat Pertamina', lat: -6.2671, lng: 106.7968 },
      { name: 'RSIA Bunda', lat: -6.2352, lng: 106.7963 },
      { name: 'RS Bhakti Yudha', lat: -6.3150, lng: 106.8689 },
      { name: 'RS Kesehatan Polri', lat: -6.2576, lng: 106.8229 },
      { name: 'RS Bhakti Keluarga', lat: -6.2155, lng: 106.8504 },
      { name: 'RSU Pusat Sumber', lat: -6.3070, lng: 106.8763 },
      { name: 'RSU Jakarta', lat: -6.2833, lng: 106.8393 },
      { name: 'RS Sumber Waras', lat: -6.1736, lng: 106.8213 },
      { name: 'RS Bina Sehat', lat: -6.2581, lng: 106.8364 },
      { name: 'RS St. Carolus', lat: -6.2088, lng: 106.8536 },
      { name: 'RS Katolik St. Vincentius', lat: -6.2301, lng: 106.8324 },
      { name: 'RS Unika Atma Jaya', lat: -6.1637, lng: 106.8016 },
      { name: 'RS Mitra Keluarga Kalideres', lat: -6.1801, lng: 106.7787 }
    ];

    // Adding markers for each hospital
    hospitals.forEach((hospital) => {
      const hospitalLocation: L.LatLngExpression = [hospital.lat, hospital.lng];
      L.marker(hospitalLocation).addTo(this.map)
        .bindPopup(`<b>${hospital.name}</b><br>Hospital located in Jakarta`)
        .openPopup();
    });
  }

  // Change basemap
  changeBasemap(event: any) {
    const selectedBasemap = event.detail.value;
    console.log('Selected basemap:', selectedBasemap);

    // Remove existing basemap layer if present
    if (this.map.hasLayer(this.osmLayer)) {
      this.map.removeLayer(this.osmLayer);
    }
    if (this.map.hasLayer(this.darkModeLayer)) {
      this.map.removeLayer(this.darkModeLayer);
    }
    if (this.map.hasLayer(this.humanitarianLayer)) {
      this.map.removeLayer(this.humanitarianLayer);
    }
    if (this.map.hasLayer(this.topoLayer)) {
      this.map.removeLayer(this.topoLayer);
    }

    // Add the selected basemap layer
    if (selectedBasemap === 'osm') {
      this.osmLayer.addTo(this.map);
    } else if (selectedBasemap === 'dark') {
      this.darkModeLayer.addTo(this.map);
    } else if (selectedBasemap === 'humanitarian') {
      this.humanitarianLayer.addTo(this.map);
    } else if (selectedBasemap === 'topo') {
      this.topoLayer.addTo(this.map);
    }
  }

  addMarker(latlng: L.LatLng) {
    if (this.marker) {
      this.marker.remove(); // Remove the previous marker
    }
    this.marker = L.marker(latlng).addTo(this.map)
      .bindPopup(`<b>Location:</b><br>Lat: ${latlng.lat}, Lng: ${latlng.lng}`)
      .openPopup();
  }
}
