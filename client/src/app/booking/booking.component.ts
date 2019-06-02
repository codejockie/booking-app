import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  displayedColumns: string[] = ['propertyId', 'propertyName', 'city', 'user'];
  dataSource: any[];
  constructor(private router: Router, private route: ActivatedRoute, private bookingService: BookingService) { }

  ngOnInit() {
    const { propertyId } = this.route.snapshot.params;
    this.bookingService.getBookings(propertyId).subscribe((bookings: any[]) => {
      this.dataSource = bookings;
    });
  }

}
