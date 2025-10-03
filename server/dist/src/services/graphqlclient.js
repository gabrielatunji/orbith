"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gql = void 0;
exports.querySubgraph = querySubgraph;
exports.testClientConnection = testClientConnection;
console.log("graphqlclient.ts loaded");
const graphql_request_1 = require("graphql-request");
const logger_1 = __importDefault(require("../utils/logger"));
const dotenv_1 = require("dotenv");
const util_1 = __importDefault(require("util"));
(0, dotenv_1.configDotenv)();
// Create client with Authorization header
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    logger_1.default.error("No API_KEY found in environment variables");
    throw new Error("API_KEY is required");
}
const DOMA_SUBGRAPH_URL = process.env.DOMA_SUBGRAPH_URL;
if (!DOMA_SUBGRAPH_URL) {
    logger_1.default.error("No DOMA_SUBGRAPH_URL found in environment variables");
    throw new Error("DOMA_SUBGRAPH_URL is required");
}
const client = new graphql_request_1.GraphQLClient(DOMA_SUBGRAPH_URL, {
    headers: {
        'api-key': API_KEY,
        "content-type": "application/json; charset=utf-8"
    }
});
function querySubgraph(query_1) {
    return __awaiter(this, arguments, void 0, function* (query, variables = {}) {
        var _a, _b;
        try {
            // **Log request headers**
            logger_1.default.info("GraphQL request headers:", JSON.stringify(client.requestConfig.headers, null, 2));
            const response = yield client.request(query, variables);
            return response;
        }
        catch (error) {
            logger_1.default.error("Subgraph query failed", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errors) || error.message || error);
            //The 'response' variable was not defined in the scope where you were trying to use it inside the catch block. Access 'error' from the catch block.
            if ((_b = error.response) === null || _b === void 0 ? void 0 : _b.errors) {
                logger_1.default.error("GraphQL Execution Errors:", JSON.stringify(error.response.errors, null, 2));
            }
            throw error;
        }
    });
}
// Sample query to check if the client is working
function testClientConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, graphql_request_1.gql) `
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
            const data = yield querySubgraph(query, variables);
            logger_1.default.info("GraphQL client connected and working:", util_1.default.inspect(data, { depth: null, colors: true }));
        }
        catch (err) {
            logger_1.default.error("GraphQL client connection test failed:", err);
        }
    });
}
// Export gql as well
const gql = graphql_request_1.gql;
exports.gql = gql;
