import { createTool } from "@mastra/core/tools";
import { z } from "zod";

/**
 * Defines the comprehensive data structure returned by the simulated domain data API.
 * This includes original market metrics and new domain-specific value drivers.
 */
const DomainDataSchema = z.object({
  collectionName: z.string().describe("The domain name."),
  tokenPrice: z.number().describe("The current price of a single token(fraction) of the domain name, in USD"),
  tradingVolume7Day: z.number().describe("The total trading volume in the last 7 days, in ETH."),
  supply: z.number().describe("The total number of unique assets in the domain."),
  
  // New metrics required for scoring
  tldType: z.enum(["Premium", "Standard", "Legacy"]).describe("The prestige type of the TLD (Top-Level Domain). 'Premium' is highly valued."),
  domainAgeInYears: z.number().int().describe("The age of the domain in years since mint/launch."),
  googleTrendsInterest: z.number().int().min(0).max(100).describe("The current Google Trends score (0-100) for related keywords."),
  onChainMcap: z.number().describe("The total market capitalization of the collection, in USD."),

  // Inputs for calculating the 'sentiment' score
  buyoutPrice: z.number().describe("The highest advertised fixed buyout price (in ETH)."),
  openOnchainOffersCount: z.number().int().describe("The current number of open offers for the domain."),
  highestOfferorTokenBalance: z.number().describe("The ETH balance of the wallet making the highest current offer."),
});

// Create the Domain Data Tool. Since we are simulating, the execute function returns mock data.
export const domainDataTool = createTool({
  id: "domainDataTool",
  description: "Retrieves comprehensive market and domain-specific data for a specific digital asset collection, including TLD type, age, onchain value, and sentiment indicators.",
  inputSchema: z.object({
    collectionName: z.string().describe("The name or ID of the asset collection to query (e.g., 'Web3Domains')."),
  }),
  outputSchema: DomainDataSchema,
  execute: async ({ context }) => {
    console.log(`[Tool] Fetching comprehensive data for: ${context.collectionName}`);

    // Mock data simulation for a high-value collection
    const mockData = {
      collectionName: context.collectionName,
      tokenPrice: 12.5,
      tradingVolume7Day: 8500, // High volume
      supply: 10000,
      
      // New simulated inputs
      tldType: "Premium" as const, // For TLD score
      domainAgeInYears: 3, // For Age score
      googleTrendsInterest: 88, // For Trend score
      onChainMcap: 75000000, // $75M for Mcap score
      buyoutPrice: 20.0, // For Sentiment
      openOnchainOffersCount: 15, // For Sentiment
      highestOfferorTokenBalance: 85.0, // For Sentiment
    };

    return mockData;
  },
});