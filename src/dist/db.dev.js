"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});
var roomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  breakfast: {
    type: Boolean,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  reserved: {
    type: String,
    required: true
  }
});
var reserveSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  roomID: {
    type: Schema.Types.ObjectId,
    ref: "Room"
  },
  check_in_date: {
    type: Date,
    required: true
  },
  check_out_date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});
var Reservation = mongoose.model("Reservations", reserveSchema);
var User = mongoose.model("Users", userSchema);
var Room = mongoose.model("Rooms", roomSchema);
module.exports = {
  Room: Room,
  User: User,
  Reservation: Reservation
};