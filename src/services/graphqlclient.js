console.log("graphqlclient.js loaded");
const { GraphQLClient, gql } = require("graphql-request");
const logger = require("../utils/logger");
const util = require('util');
require("dotenv").config();

// Create client with Authorization header
const client = new GraphQLClient(process.env.DOMA_SUBGRAPH_URL, {
  headers: {
    'api-key': process.env.API_KEY
  }
});

async function querySubgraph(query, variables = {}) {
  try {
    return await client.request(query, variables);
  } catch (err) {
    logger.error("Subgraph query failed", err.response?.errors || err.message || err);
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