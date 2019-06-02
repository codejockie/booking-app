import { Response } from "express";

import { Booking } from "../models/Booking";
import { IRequest } from "./IRequest";

export class BookingController {
  public static async getBookings(request: IRequest, response: Response) {
    const { propertyId } = request.params;
    const allBookings = await Booking.find({ propertyId });
    response.send(allBookings);
  }

  public static async createBooking(request: IRequest, response: Response) {
    const { userID } = request.user;
    const booking = await new Booking({ ...request.body, user: userID }).save()
    .catch((error) => response.status(500).send({ error: "Error creating booking" }));
    response.status(201).send({ status: "ok", booking });
  }
}
