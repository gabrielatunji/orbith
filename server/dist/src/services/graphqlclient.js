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
console.log("graphqlclient.ts loaded");
const graphql_request_1 = require("graphql-request");
const logger_1 = __importDefault(require("../utils/logger"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
// Create client with Authorization header
const API_KEY = process.env.API_KEY;
const DOMA_SUBGRAPH_URL = process.env.DOMA_SUBGRAPH_URL;
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
            //logger.info("GraphQL request headers:", JSON.stringify(client.requestConfig.headers, null, 2));
            const response = yield client.request(query, variables);
            return response;
        }
        catch (error) {
            logger_1.default.error("Subgraph query failed", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errors) || error.message || error);
            if ((_b = error.response) === null || _b === void 0 ? void 0 : _b.errors) {
                logger_1.default.error("GraphQL Execution Errors:", JSON.stringify(error.response.errors, null, 2));
            }
            throw error;
        }
    });
}
;
const gql = graphql_request_1.gql;
exports.gql = gql;
