import { Request, Response } from "express";
import { bookings } from "../data/bookings";

export class BookingController {
  public static getBookings(request: Request, response: Response) {
    const { propertyId } = request.params;
    const allBookings = bookings.filter((booking) => booking.propertyId === propertyId);
    response.send(allBookings);
  }
}
