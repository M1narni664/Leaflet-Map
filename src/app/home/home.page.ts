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
    //Inisiasi peta dan set view
    this.map = L.map('mapId').setView([-6.31060, 106.82026], 15
    );

    //Inisiasi basemap (tanpa ditampilkan)
    //Default OSM
    this.osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    //DarkMode OSM
    this.darkModeLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
      maxZoom: 19
    });

    //Humanitarian OSM
    this.humanitarianLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; Humanitarian OSM Team',
      maxZoom: 19
    });

    //OpenTopoMap
    this.topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenTopoMap contributors',
      maxZoom: 17
    });

    //Menambahkan marker default
    const defaultLocation: L.LatLngExpression = [-6.31060, 106.82026];
    this.marker = L.marker(defaultLocation).addTo(this.map)
      .bindPopup('<b>Kebun Binatang Ragunan</b><br>Taman Margasatwa di Jakarta Selatan')
      .openPopup();

    //Menambahkan click event listener agar marker dapat ditambah dinamis
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.addMarker(e.latlng);
    });
  }

  //Merubah basemap sesuai pilihan
  changeBasemap(event: any) {
    const selectedBasemap = event.detail.value;
    console.log('Selected basemap:', selectedBasemap);

    //Menghapus layer basemap jika dibutuhkan
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

    //Memunculkan basemap pilihan
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
      this.marker.remove(); //Menghapus marker sebelumnya
    }
    this.marker = L.marker(latlng).addTo(this.map)
      .bindPopup(`<b>Location:</b><br>Lat: ${latlng.lat}, Lng: ${latlng.lng}`)
      .openPopup();
  }
}
