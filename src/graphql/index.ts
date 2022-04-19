import { ApolloServer } from "apollo-server-lambda";
import { presignedUrl } from "./query";
import { Resolvers } from "./generated/graphql";
import schema from "./schema";

const IS_LOCAL = Boolean(process.env.IS_LOCAL);

const resolvers: Resolvers = {
  Query: {
    health: () => "I'm healthy",
    presignedUrl: async (_, args) => {
      return await presignedUrl(args);
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  // introspection: IS_LOCAL,
  introspection: true,
});

export const handler = server.createHandler();
