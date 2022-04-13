import fs from "fs";
import { ApolloServer, gql } from "apollo-server-lambda";
import { presignedUrl } from "./query";
import { Resolvers } from "./generated/graphql";

const IS_LOCAL = Boolean(process.env.IS_LOCAL);
const schema = fs.readFileSync("./src/graphql/schema.graphql", "utf8");

const typeDefs = gql(schema);

const resolvers: Resolvers = {
  Query: {
    health: () => "I'm healthy",
    presignedUrl: async (_, args) => {
      return await presignedUrl(args);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers,
  introspection: IS_LOCAL,
});

export const handler = server.createHandler();
