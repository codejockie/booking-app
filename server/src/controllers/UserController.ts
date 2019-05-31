import { Request, Response } from "express";
import { bookings } from "../data/bookings";

export class UserController {
  public static getUserBookings(request: Request, response: Response) {
    const { userId } = request.params;
    const allBookings = bookings.filter((booking) => booking.user.id === userId);
    response.send(allBookings);
  }
}
