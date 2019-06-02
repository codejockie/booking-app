import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Property } from './property';

const BASE_URL = 'http://localhost:3000';
const HERE_API_URL = 'https://places.demo.api.here.com/places/v1/discover/explore?at=52.5159%2C13.3777' +
  '&cat=accommodation&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(property: Property) {
    const body = {
      city: property.city,
      propertyId: property.id,
      propertyName: property.name,
    };
    return this.http.post(`${BASE_URL}/bookings`, body);
  }

  getBookings(propertyId) {
    return this.http.get(`${BASE_URL}/properties/${propertyId}/bookings`);
  }

  getProperties() {
    return this.http
      .get(HERE_API_URL)
      .pipe(map(({ results: { items } }: any) => (
        items.map(property => ({
          id: property.id,
          name: property.title,
          city: property.vicinity.split(',')[1].trim().split(' ')[1]
        }))
      )));
  }
}
