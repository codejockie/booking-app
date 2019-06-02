import { Response } from "express";

import { Booking } from "../models/Booking";
import { IRequest } from "./IRequest";

export class UserController {
  public static async getUserBookings(request: IRequest, response: Response) {
    const { userId } = request.params;
    const allBookings = await Booking.find({ user: userId });
    response.send(allBookings);
  }
}
