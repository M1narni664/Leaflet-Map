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

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    if (!this.map) {
      this.initializeMap();
    }
  }

  initializeMap() {
    // Initialize the map
    this.map = L.map('mapId').setView([51.505, -0.09], 10);

    // Add the OpenStreetMap tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Fix: Use a valid LatLngExpression (array of numbers)
    const defaultLocation: L.LatLngExpression = [51.505, -0.09]; // Example coordinates (London)

    // Add a default marker at the specified location
    this.marker = L.marker(defaultLocation).addTo(this.map)
      .bindPopup('<b>Hello!</b><br>This is a default marker.')
      .openPopup();

    // Add a click event listener to the map to add markers dynamically
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.addMarker(e.latlng);
    });
  }

  // Function to add a marker on click
  addMarker(latlng: L.LatLng) {
    if (this.marker) {
      this.marker.remove();  // Remove the previous marker if any
    }
    this.marker = L.marker(latlng).addTo(this.map)
      .bindPopup(`<b>Location:</b><br>Lat: ${latlng.lat}, Lng: ${latlng.lng}`)
      .openPopup();
  }
}
