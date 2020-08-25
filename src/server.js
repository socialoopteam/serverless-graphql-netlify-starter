const ApolloServer = require("apollo-server").ApolloServer;
const ApolloServerLambda = require("apollo-server-lambda").ApolloServer;
const { gql } = require("apollo-server-lambda");
const { User, Reservation, Room } = require("./db");
const mongoose = require("mongoose");

const typeDefs = gql`
  type Query {
    rooms: [Room!]!
    room(id: ID!): Room!
    reservations: [Reservation!]!
    reservation(id: ID!): Reservation!
    hello: String
  }
  type Room {
    id: ID!
    name: String
    capacity: Int!
    price: Int!
    position: String!
    description: String!
    breakfast: Boolean!
    quantity: Int!
    reserved: TaskReservation!
  }
  type Reservation {
    id: ID!
    name: String!
    email: String!
    phone: String!
    address: String
    roomID: ID!
    check_in_date: String!
    check_out_date: String!
  }
  enum TaskReservation {
    RESERVED
    UNRESERVED
  }
  input roomInput {
    name: String
    capacity: Int!
    price: Int!
    position: String!
    description: String!
    breakfast: Boolean!
    quantity: Int!
    reserved: TaskReservation!
  }
  input reservationInput {
    name: String!
    email: String!
    phone: String!
    address: String
    roomID: ID!
    check_in_date: String!
    check_out_date: String!
  }
  type Mutation {
    createReservation(input: reservationInput!): Reservation!
    createRoom(input: roomInput!): Room!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hi! Love from @songonpark 🤠.",
    rooms: () => Room.find().sort({ price: 1 }),
    reservations: () => Reservation.find().sort({ date: 1 }),
    room: (_, { id }) => {
      return Room.findById(id);
    },
    reservation: (_, { id }) => {
      return Reservation.findById(id);
    },
  },
  Mutation: {
    createReservation: async (_, { input }) => {
      const new_reservation = Reservation(input);
      return await new_reservation.save();
    },
    createRoom: async (_, { input }) => {
      const new_room = Room(input);
      return await new_room.save();
    },
  },
};

function createLambdaServer() {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

function createLocalServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

async function dbConnect(url) {
  try {
    await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true, //used for Mongo Atlas instead of local database
    });
    console.log("connected to database ");
  } catch (error) {
    console.error(
      "Database not available. Please ensure you that the mongod service is enable."
    );
  }
}

module.exports = { createLambdaServer, createLocalServer, dbConnect };
