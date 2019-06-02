import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { BookingService } from '../booking.service';
import { Property } from '../property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myControl = new FormControl();
  properties: Property[];
  filteredProperties: Observable<Property[]>;

  constructor(private router: Router, private bookingService: BookingService) {
  }

  createBooking() {
    this.bookingService.createBooking(this.myControl.value).subscribe((response: any) => {
      if (response.status === 'ok') {
        const { booking } = response;
        this.router.navigate(['bookings', booking.propertyId]);
      }
    });
  }

  ngOnInit() {
    this.bookingService.getProperties().subscribe(properties => {
      this.properties = properties;
      this.filteredProperties = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
    });
  }

  displayFn(property?: Property): string | undefined {
    return property ? property.name : undefined;
  }

  private filter(property?: Property): Property[] {
    if (!property) {
      return this.properties;
    }

    const filterValue = property.name.toLowerCase();
    return this.properties.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
