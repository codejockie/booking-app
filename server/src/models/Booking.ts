import { model, Schema } from "mongoose";

export const BookingSchema = new Schema({
  city: { type: String },
  propertyId: { type: String },
  propertyName: { type: String },
  user: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});
export const Booking = model("Booking", BookingSchema);
