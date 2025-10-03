console.log("graphqlclient.ts loaded");
import { GraphQLClient, gql as gqlTag, RequestDocument, Variables } from "graphql-request";
import logger from "../utils/logger";
import { configDotenv } from "dotenv";

configDotenv(); 

// Create client with Authorization header
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  logger.error("No API_KEY found in environment variables");
  throw new Error("API_KEY is required");
}

const DOMA_SUBGRAPH_URL = process.env.DOMA_SUBGRAPH_URL;

if (!DOMA_SUBGRAPH_URL) {
    logger.error("No DOMA_SUBGRAPH_URL found in environment variables");
    throw new Error("DOMA_SUBGRAPH_URL is required");
}

const client = new GraphQLClient(DOMA_SUBGRAPH_URL, {
  headers: {
    'api-key': API_KEY,
    "content-type": "application/json; charset=utf-8"
  }
});

async function querySubgraph<T>(query: RequestDocument, variables: Variables = {}): Promise<T> {
  try {
    // **Log request headers**
    logger.info("GraphQL request headers:", JSON.stringify(client.requestConfig.headers, null, 2));
    const response = await client.request<T>(query, variables);

    return response;
  } catch (error: any) {
    logger.error("Subgraph query failed", error.response?.errors || error.message || error);
      //The 'response' variable was not defined in the scope where you were trying to use it inside the catch block. Access 'error' from the catch block.
     if (error.response?.errors) {
        logger.error("GraphQL Execution Errors:", JSON.stringify(error.response.errors, null, 2));
    }
    throw error;
  }
}

// Sample query to check if the client is working
async function testClientConnection() {
  const query = gqlTag`
    query Name($name: String!) {
      name(name: $name) {
        registrar {
          name
          supportEmail
          websiteUrl
        }
        tokens {
          chain {
            name
          }
        }
      }
    }
  `;

  try {
    const variables = { name: "aiwhispers.com" };
    const data = await querySubgraph(query, variables);
    logger.info("GraphQL client connected and working:",
      util.inspect(data, { depth: null, colors: true })
    );
  } catch (err) {
    logger.error("GraphQL client connection test failed:", err);
  }
}

// Export gql as well
const gql = gqlTag;

export {
  querySubgraph,
  gql,
  testClientConnection  // Add this export
};