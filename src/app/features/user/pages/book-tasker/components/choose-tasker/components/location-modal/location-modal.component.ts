import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { ButtonComponent } from '@shared/components/button/button.component';
import { LocationService } from '@features/user/services/book-tasker/location/location.service';
import { ILocationLatLng } from '@features/user/models/book-tasker/location.model';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-location-modal',
  imports: [ButtonComponent],
  templateUrl: './location-modal.component.html',
  styleUrl: './location-modal.component.scss',
})
export class LocationModalComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private DEFAULT_POS = [10.8505, 76.2711];
  private _locationService = inject(LocationService);
  private _dialogRef = inject(DialogRef);
  private _data: ILocationLatLng = inject(DIALOG_DATA);

  isReadOnly = false;

  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private map!: L.Map;
  private marker!: L.Marker;

  close(data: ILocationLatLng | null = null) {
    this._dialogRef.close(data);
  }

  // set location cords in marker
  setMarkerLocation(lat: number, lng: number) {
    if (!this.marker) {
      this.marker = L.marker([lat, lng], { draggable: !this.isReadOnly }).addTo(
        this.map,
      );
      return;
    }
    this.marker.setLatLng({ lat, lng });
  }

  // get and use current user location
  useCurrLocation() {
    if (!this.isReadOnly) return;
    this._locationService.getCurrLocation().then((cordinates) => {
      this.map.setView([cordinates.lat, cordinates.lng]);
      this.setMarkerLocation(cordinates.lat, cordinates.lng);
    });
  }

  openGoogleMapNavigation() {
    const url = `https://www.google.com/maps/search/?api=1&query=${this._data.lat},${this._data.lng}`;
    window.open(url, '_blank');
  }

  // initilaize the map
  initMap() {
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [this.DEFAULT_POS[0], this.DEFAULT_POS[1]],
      13,
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    this.setMarkerLocation(this.DEFAULT_POS[0], this.DEFAULT_POS[1]);
  }

  // on clicking set location -> send cordintates to parent component
  setLocation() {
    const cordinates = this.marker.getLatLng();
    this.close({ lat: cordinates.lat, lng: cordinates.lng });
  }

  ngOnInit(): void {
    if (this._data) {
      this.DEFAULT_POS = [this._data.lat, this._data.lng];
      this.isReadOnly = this._data.isReadOnly ?? false;
    }
  }

  ngAfterViewInit(): void {
    this.initMap();

    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng();
      this.setMarkerLocation(pos.lat, pos.lng);
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
