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
exports.fetchFractionalDomains = exports.fetchNewListings = exports.fetchSpecificDomainName = exports.fetchLatestDomains = void 0;
const graphqlclient_1 = require("./graphqlclient");
const logger_1 = __importDefault(require("../utils/logger"));
const fetchLatestDomains = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const query = (0, graphqlclient_1.gql) `
      query Names($skip: Int, $take: Int, $sortOrder: SortOrderType, $active: Boolean) {
        names(skip: $skip, take: $take, sortOrder: $sortOrder, active: $active) {
          items {
            claimedBy
            name
            registrar {
              name
            }
            tokenizedAt
          }
          currentPage
          hasNextPage
          hasPreviousPage
        }
      }
    `;
        const response = yield (0, graphqlclient_1.querySubgraph)(query, { fractionalized: true, active: true, skip: 0, take: 10, sortOrder: 'DESC' });
        console.log("Fetched new domains:", JSON.stringify(((_a = response === null || response === void 0 ? void 0 : response.names) === null || _a === void 0 ? void 0 : _a.items) || []));
        return JSON.stringify(((_b = response === null || response === void 0 ? void 0 : response.names) === null || _b === void 0 ? void 0 : _b.items) || []);
    }
    catch (err) {
        logger_1.default.error("Error fetching new domains", err);
        return JSON.stringify([]); // Return empty array string on error
    }
});
exports.fetchLatestDomains = fetchLatestDomains;
const fetchSpecificDomainName = (domainName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = (0, graphqlclient_1.gql) `
      query Name($name: String!) {
        name(name: $name) {
          claimedBy
          nameservers {
            ldhName
          }
          name
          tokenizedAt
          registrar {
            name
          }
          fractionalTokenInfo {
            address
            buyoutPrice
            chain {
              name
            }
            fractionalizedAt
            currentPrice
            fractionalizedBy
            poolAddress
            launchpadAddress
          }
          isFractionalized
          tokens {
            chain {
              name
            }
            openseaCollectionSlug
            ownerAddress
            tokenAddress
            startsAt
            createdAt
            listings {
              orderbook
              price
            }
          }
        }
      }
    `;
        const response = yield (0, graphqlclient_1.querySubgraph)(query, { name: domainName });
        console.log("Fetched specific domain:", JSON.stringify((response === null || response === void 0 ? void 0 : response.name) || {}));
        return JSON.stringify((response === null || response === void 0 ? void 0 : response.name) || {});
    }
    catch (err) {
        logger_1.default.error("Error fetching specific domain", err);
        return JSON.stringify({}); // Return empty object string on error
    }
});
exports.fetchSpecificDomainName = fetchSpecificDomainName;
const fetchNewListings = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const query = (0, graphqlclient_1.gql) `
      query Listings($skip: Int, $take: Int, $createdSince: DateTime) {
        listings(skip: $skip, take: $take, createdSince: $createdSince) {
          items {
            chain {
              name
            }
            name
            price
            tokenAddress
            imageURI
            id
            currency {
              name
              symbol
              usdExchangeRate
            }
            createdAt
            orderbook
          }
        }
      }
    `;
        const response = yield (0, graphqlclient_1.querySubgraph)(query, { skip: 0, take: 5, createdSince: "2025-10-01T01:18:30.306Z" });
        console.log("Fetched new listings:", JSON.stringify(((_a = response === null || response === void 0 ? void 0 : response.listings) === null || _a === void 0 ? void 0 : _a.items) || []));
        return JSON.stringify(((_b = response === null || response === void 0 ? void 0 : response.listings) === null || _b === void 0 ? void 0 : _b.items) || []);
    }
    catch (err) {
        logger_1.default.error("Error fetching new listings", err);
        return JSON.stringify([]); // Return empty array string on error
    }
});
exports.fetchNewListings = fetchNewListings;
const fetchFractionalDomains = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const query = (0, graphqlclient_1.gql) `
      query FractionalTokens($skip: Int, $take: Int, $status: FractionalTokenStatus) {
        fractionalTokens(skip: $skip, take: $take, status: $status) {
          items {
            chain {
              name
            }
            currentPrice
            metadata {
              primaryWebsite
              description
            }
            params {
              symbol
            }
            status
            address
            name
          }
        }
      }
    `;
        const response = yield (0, graphqlclient_1.querySubgraph)(query, { skip: 0, take: 5, status: "FRACTIONALIZED" });
        console.log("Fetched fractional domains:", JSON.stringify(((_a = response === null || response === void 0 ? void 0 : response.fractionalTokens) === null || _a === void 0 ? void 0 : _a.items) || []));
        return JSON.stringify(((_b = response === null || response === void 0 ? void 0 : response.fractionalTokens) === null || _b === void 0 ? void 0 : _b.items) || []);
    }
    catch (err) {
        logger_1.default.error("Error fetching fractional domains", err);
        return JSON.stringify([]); // Return empty array string on error
    }
});
exports.fetchFractionalDomains = fetchFractionalDomains;
