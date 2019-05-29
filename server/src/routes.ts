import { Router } from "express";

export const routes = (router: Router) => {
  router.route('/properties/:property_id/bookings')
  .get();
  router.route('/users/:user_id/bookings')
  .get();
};