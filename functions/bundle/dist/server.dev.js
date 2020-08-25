"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Query {\n    rooms: [Room!]!\n    room(id: ID!): Room!\n    reservations: [Reservation!]!\n    reservation(id: ID!): Reservation!\n    hello: String\n  }\n  type Room {\n    id: ID!\n    name: String\n    capacity: Int!\n    price: Int!\n    position: String!\n    description: String!\n    breakfast: Boolean!\n    quantity: Int!\n    reserved: TaskReservation!\n  }\n  type Reservation {\n    id: ID!\n    name: String!\n    email: String!\n    phone: String!\n    address: String\n    roomID: ID!\n    check_in_date: String!\n    check_out_date: String!\n  }\n  enum TaskReservation {\n    RESERVED\n    UNRESERVED\n  }\n  input roomInput {\n    name: String\n    capacity: Int!\n    price: Int!\n    position: String!\n    description: String!\n    breakfast: Boolean!\n    quantity: Int!\n    reserved: TaskReservation!\n  }\n  input reservationInput {\n    name: String!\n    email: String!\n    phone: String!\n    address: String\n    roomID: ID!\n    check_in_date: String!\n    check_out_date: String!\n  }\n  type Mutation {\n    createReservation(input: reservationInput!): Reservation!\n    createRoom(input: roomInput!): Room!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ApolloServer = require('apollo-server').ApolloServer;

var ApolloServerLambda = require('apollo-server-lambda').ApolloServer;

var _require = require("./db"),
    User = _require.User,
    Reservation = _require.Reservation,
    Room = _require.Room;

var _require2 = require('apollo-server-lambda'),
    gql = _require2.gql;

var typeDefs = gql(_templateObject());
var resolvers = {
  Query: {
    hello: function hello() {
      return "Hi! Love from @songonpark 🤠.";
    },
    rooms: function rooms() {
      return Room.find().sort({
        price: 1
      });
    },
    reservations: function reservations() {
      return Reservation.find().sort({
        date: 1
      });
    },
    room: function room(_, _ref) {
      var id = _ref.id;
      return Room.findById(id);
    },
    reservation: function reservation(_, _ref2) {
      var id = _ref2.id;
      return Reservation.findById(id);
    }
  },
  Mutation: {
    createReservation: function createReservation(_, _ref3) {
      var input, new_reservation;
      return regeneratorRuntime.async(function createReservation$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              input = _ref3.input;
              new_reservation = Reservation(input);
              _context.next = 4;
              return regeneratorRuntime.awrap(new_reservation.save());

            case 4:
              return _context.abrupt("return", _context.sent);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    createRoom: function createRoom(_, _ref4) {
      var input, new_room;
      return regeneratorRuntime.async(function createRoom$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              input = _ref4.input;
              new_room = Room(input);
              _context2.next = 4;
              return regeneratorRuntime.awrap(new_room.save());

            case 4:
              return _context2.abrupt("return", _context2.sent);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }
};

function createLambdaServer() {
  return new ApolloServerLambda({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    playground: true
  });
}

function createLocalServer() {
  return new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    playground: true
  });
}

function dbConnect(url) {
  return regeneratorRuntime.async(function dbConnect$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(url, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true //used for Mongo Atlas instead of local database

          }));

        case 3:
          console.log("connected to database ");
          _context3.next = 9;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.error("Database not available. Please ensure you that the mongod service is enable.");

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

module.exports = {
  createLambdaServer: createLambdaServer,
  createLocalServer: createLocalServer,
  dbConnect: dbConnect
};