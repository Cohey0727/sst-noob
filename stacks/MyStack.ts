import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a HTTP API
    const restApi = new sst.Api(this, "Api", {
      routes: {
        "GET /health": "src/rest/health.handler",
      },
    });
    const graphQLApi = new sst.GraphQLApi(this, "GraphqlApi", {
      server: "src/graphql/index.handler",
    });

    // Show the API endpoint in output
    this.addOutputs({
      RestApiEndpoint: restApi.url,
      GraphQLEndpoint: graphQLApi.url,
    });
  }
}
