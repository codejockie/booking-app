import { Router } from "express";

import { BookingController } from './controllers/BookingController';
import { UserController } from './controllers/UserController';

export const routes = (router: Router) => {
  router.route('/properties/:propertyId/bookings')
  .get(BookingController.getBookings);
  router.route('/users/:userId/bookings')
  .get(UserController.getUserBookings);
};