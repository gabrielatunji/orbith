console.log("graphqlclient.js loaded");
const { GraphQLClient, gql } = require("graphql-request");
const logger = require("../utils/logger");
const util = require('util');
require("dotenv").config();

// Create client with Authorization header
const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        logger.error("No API_KEY found in environment variables");
        throw new Error("API_KEY is required");
    }
const client = new GraphQLClient(process.env.DOMA_SUBGRAPH_URL, {
  headers: {
    'api-key': API_KEY,
    "content-type": "application/json; charset=utf-8"
  }
});

async function querySubgraph(query, variables = {}) {
  try {
      // **Log request headers**
    logger.info("GraphQL request headers:", JSON.stringify(client.requestConfig.headers, null, 2));
    return await client.request(query, variables);
    
  } catch (err) {
    logger.error("Subgraph query failed", err.response?.errors || err.message || err);
     if (response.errors) {
    logger.error("GraphQL Execution Errors:", JSON.stringify(response.errors, null, 2));
    }
    throw err;
  }
}

// Sample query to check if the client is working
async function testClientConnection() {
  const query = gql`
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
    const variables = {name: "aiwhispers.com"};
    const data = await querySubgraph(query, variables);
    logger.info("GraphQL client connected and working:", 
      util.inspect(data, { depth: null, colors: true })
    );
  } catch (err) {
    logger.error("GraphQL client connection test failed:", err);
  }
};

// Modify the exports at the bottom
module.exports = { 
  querySubgraph, 
  gql,
  testClientConnection  // Add this export
};