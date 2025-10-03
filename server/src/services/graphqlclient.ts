console.log("graphqlclient.ts loaded");
import { GraphQLClient, gql as gqlTag, RequestDocument, Variables } from "graphql-request";
import logger from "../utils/logger";
import { configDotenv } from "dotenv";

configDotenv(); 

// Create client with Authorization header
const API_KEY = process.env.API_KEY!;
const DOMA_SUBGRAPH_URL = process.env.DOMA_SUBGRAPH_URL!;

const client = new GraphQLClient(DOMA_SUBGRAPH_URL, {
  headers: {
    'api-key': API_KEY,
    "content-type": "application/json; charset=utf-8"
  }
});

async function querySubgraph<T>(query: RequestDocument, variables: Variables = {}): Promise<T> {
  try {
    //logger.info("GraphQL request headers:", JSON.stringify(client.requestConfig.headers, null, 2));
    const response = await client.request<T>(query, variables);

    return response;
  } catch (error: any) {
    logger.error("Subgraph query failed", error.response?.errors || error.message || error);
     if (error.response?.errors) {
        logger.error("GraphQL Execution Errors:", JSON.stringify(error.response.errors, null, 2));
    }
    throw error;
  }
}; 

const gql = gqlTag;

export {
  querySubgraph,
  gql
};