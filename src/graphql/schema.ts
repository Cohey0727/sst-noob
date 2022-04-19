import { gql } from "apollo-server-lambda";

const schema = gql`
  type Query {
    health: String
    presignedUrl(userId: String!, fileName: String!): String!
  }
`;

export default schema;
