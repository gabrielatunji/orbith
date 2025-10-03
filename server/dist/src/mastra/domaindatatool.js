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
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainDataTool = void 0;
const tools_1 = require("@mastra/core/tools");
const zod_1 = require("zod");
/**
 * Defines the comprehensive data structure returned by the simulated domain data API.
 * This includes original market metrics and new domain-specific value drivers.
 */
const DomainDataSchema = zod_1.z.object({
    collectionName: zod_1.z.string().describe("The name of the asset collection."),
    floorPrice: zod_1.z.number().describe("The current lowest price for the asset, in ETH."),
    tradingVolume7Day: zod_1.z.number().describe("The total trading volume in the last 7 days, in ETH."),
    supply: zod_1.z.number().describe("The total number of unique assets in the collection."),
    // New metrics required for scoring
    tldType: zod_1.z.enum(["Premium", "Standard", "Legacy"]).describe("The prestige type of the TLD (Top-Level Domain). 'Premium' is highly valued."),
    domainAgeInYears: zod_1.z.number().int().describe("The age of the domain/collection in years since mint/launch."),
    googleTrendsInterest: zod_1.z.number().int().min(0).max(100).describe("The current Google Trends score (0-100) for related keywords."),
    onChainMcap: zod_1.z.number().describe("The total market capitalization of the collection, in USD."),
    // Inputs for calculating the 'sentiment' score
    buyoutPrice: zod_1.z.number().describe("The highest advertised fixed buyout price (in ETH)."),
    openOnchainOffersCount: zod_1.z.number().int().describe("The current number of open offers for the domain."),
    highestOfferorTokenBalance: zod_1.z.number().describe("The ETH balance of the wallet making the highest current offer."),
});
// Create the Domain Data Tool. Since we are simulating, the execute function returns mock data.
exports.domainDataTool = (0, tools_1.createTool)({
    id: "domainDataTool",
    description: "Retrieves comprehensive market and domain-specific data for a specific digital asset collection, including TLD type, age, onchain value, and sentiment indicators.",
    inputSchema: zod_1.z.object({
        collectionName: zod_1.z.string().describe("The name or ID of the asset collection to query (e.g., 'Web3Domains')."),
    }),
    outputSchema: DomainDataSchema,
    execute: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context }) {
        console.log(`[Tool] Fetching comprehensive data for: ${context.collectionName}`);
        // Mock data simulation for a high-value collection
        const mockData = {
            collectionName: context.collectionName,
            floorPrice: 12.5,
            tradingVolume7Day: 8500, // High volume
            supply: 10000,
            // New simulated inputs
            tldType: "Premium", // For TLD score
            domainAgeInYears: 3, // For Age score
            googleTrendsInterest: 88, // For Trend score
            onChainMcap: 75000000, // $75M for Mcap score
            buyoutPrice: 20.0, // For Sentiment
            openOnchainOffersCount: 15, // For Sentiment
            highestOfferorTokenBalance: 85.0, // For Sentiment
        };
        return mockData;
    }),
});
