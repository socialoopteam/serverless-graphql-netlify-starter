"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Query {\n    rooms: [Room!]!\n    room(id: ID!): Room!\n    reservations: [Reservation!]!\n    reservation(id: ID!): Reservation!\n    hello: String\n  }\n  type Room {\n    id: ID!\n    name: String\n    capacity: Int!\n    price: Int!\n    position: String!\n    description: String!\n    breakfast: Boolean!\n    quantity: Int!\n    reserved: TaskReservation!\n  }\n  type Reservation {\n    id: ID!\n    name: String!\n    email: String!\n    phone: String!\n    address: String\n    roomID: ID!\n    check_in_date: String!\n    check_out_date: String!\n  }\n  enum TaskReservation {\n    RESERVED\n    UNRESERVED\n  }\n  input roomInput {\n    name: String\n    capacity: Int!\n    price: Int!\n    position: String!\n    description: String!\n    breakfast: Boolean!\n    quantity: Int!\n    reserved: TaskReservation!\n  }\n  input reservationInput {\n    name: String!\n    email: String!\n    phone: String!\n    address: String\n    roomID: ID!\n    check_in_date: String!\n    check_out_date: String!\n  }\n  type Mutation {\n    createReservation(input: reservationInput!): Reservation!\n    createRoom(input: roomInput!): Room!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ApolloServer = require("apollo-server").ApolloServer;

var ApolloServerLambda = require("apollo-server-lambda").ApolloServer;

var _require = require("apollo-server-lambda"),
    gql = _require.gql;

var _require2 = require("./db"),
    User = _require2.User,
    Reservation = _require2.Reservation,
    Room = _require2.Room;

var mongoose = require("mongoose");

var typeDefs = gql(_templateObject());
var resolvers = {
  Query: {
    hello: function hello() {
      return "Hi! Love from @songonpark 🤠.";
    },
    rooms: function rooms() {
      return regeneratorRuntime.async(function rooms$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(Room.find().sort({
                price: 1
              }));

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    reservations: function reservations() {
      return regeneratorRuntime.async(function reservations$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(Reservation.find().sort({
                date: 1
              }));

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    room: function room(_, _ref) {
      var id;
      return regeneratorRuntime.async(function room$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = _ref.id;
              _context3.next = 3;
              return regeneratorRuntime.awrap(Room.findById(id));

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    reservation: function reservation(_, _ref2) {
      var id;
      return regeneratorRuntime.async(function reservation$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = _ref2.id;
              _context4.next = 3;
              return regeneratorRuntime.awrap(Reservation.findById(id));

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  },
  Mutation: {
    createReservation: function createReservation(_, _ref3) {
      var input, new_reservation;
      return regeneratorRuntime.async(function createReservation$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              input = _ref3.input;
              new_reservation = Reservation(input);
              _context5.next = 4;
              return regeneratorRuntime.awrap(new_reservation.save());

            case 4:
              return _context5.abrupt("return", _context5.sent);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    createRoom: function createRoom(_, _ref4) {
      var input, new_room;
      return regeneratorRuntime.async(function createRoom$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              input = _ref4.input;
              new_room = Room(input);
              _context6.next = 4;
              return regeneratorRuntime.awrap(new_room.save());

            case 4:
              return _context6.abrupt("return", _context6.sent);

            case 5:
            case "end":
              return _context6.stop();
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
  return regeneratorRuntime.async(function dbConnect$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(url, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true //used for Mongo Atlas instead of local database

          }));

        case 3:
          console.log("connected to database ");
          _context7.next = 9;
          break;

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          console.error("Database not available. Please ensure you that the mongod service is enable.");

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

module.exports = {
  createLambdaServer: createLambdaServer,
  createLocalServer: createLocalServer,
  dbConnect: dbConnect
};