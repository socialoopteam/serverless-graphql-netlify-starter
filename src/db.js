const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  breakfast: {
    type: Boolean,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  reserved: {
    type: String,
    required: true,
  },
});
const reserveSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: { unique: true },
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    roomID: { type: Schema.Types.ObjectId, ref: "Room" },
    check_in_date: {
      type: Date,
      required: true,
    },
    check_out_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
const Reservation = mongoose.model("Reservations", reserveSchema);
const User = mongoose.model("Users", userSchema);
const Room = mongoose.model("Rooms", roomSchema);

module.exports = { Room, User, Reservation };
