"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rarityAgent = exports.analysisOutputSchema = void 0;
const agent_1 = require("@mastra/core/agent");
const zod_1 = require("zod");
const google_1 = require("@ai-sdk/google");
const domaindatatool_1 = require("./domaindatatool");
/**
 * Defines the structured output with 7 required scores, all scaled 10-100.
 * The core 'rarityScore' is a composite, and the others provide detailed insight.
 */
exports.analysisOutputSchema = zod_1.z.object({
    // The main, single composite score
    rarityScore: zod_1.z.number().int().min(10).max(100).describe("The final, composite rarity score for the domain, calculated as a weighted average of all other metrics (10-100)."),
    // The six detailed insight scores (10-100 scale)
    tld: zod_1.z.number().int().min(10).max(100).describe("Score representing the Top-Level Domain's prestige or inherent scarcity (10-100). Premium TLDs score high."),
    trend: zod_1.z.number().int().min(10).max(100).describe("Score reflecting the Google Trends interest (0-100 scale) for related keywords (10-100)."),
    age: zod_1.z.number().int().min(10).max(100).describe("Score based on the domain's age in years, rewarding older, more established domains (10-100)."),
    mcap: zod_1.z.number().int().min(10).max(100).describe("Score based on the onchain market capitalization of the collection/domain (10-100). Higher MCAP scores high."),
    volume: zod_1.z.number().int().min(10).max(100).describe("Score derived from recent trading volume (10-100). High volume scores high."),
    sentiment: zod_1.z.number().int().min(10).max(100).describe("Composite score representing market sentiment, calculated from buyout price, open onchain offers, and offeror's token balance (10-100)."),
    // A brief, objective analysis of the scores
    analysis: zod_1.z.string().describe("A concise, objective analysis (two to three sentences) summarizing the key drivers behind the calculated scores. You MUST NOT give an investment recommendation (e.g., STRONG_BUY, STRONG_SELL, or HOLD)."),
});
/**
 * Updated instructions to guide the agent on calculating the 7 distinct scores.
 */
const instructions = `You are the Domain Rarity Agent, a sophisticated analytical tool. Your role is to take the raw data from the 'domainDataTool' and calculate seven distinct scores, all scaled from 10 (low value/rarity) to 100 (high value/rarity).

**Calculation Rules for Scores (10-100 Scale):**
1.  **tld:** Map 'Premium' to 90-100, 'Legacy' to 70-90, and 'Standard' to 40-70.
2.  **trend:** Use the raw 'googleTrendsInterest' (0-100) as the base score, ensuring it remains within the 10-100 range.
3.  **age:** Linearly scale 'domainAgeInYears'. E.g., 10 years or more is 100, 1 year is 10.
4.  **mcap:** Scale the 'onChainMcap' (USD) against a high benchmark (e.g., $100M = 100, $10M = 50, $1M = 25).
5.  **volume:** Scale the 'tradingVolume7Day' (ETH). High volume (e.g., >5,000 ETH) should result in a 80-100 score. Low volume (<100 ETH) should be 10-30.
6.  **sentiment:** Calculate a composite score based on: high 'buyoutPrice', large 'openOnchainOffersCount', and high 'highestOfferorTokenBalance' (indicating serious buyers). Weight these factors equally.
7.  **rarityScore:** Calculate this as a simple, unweighted average of the six individual scores (tld, trend, age, mcap, volume, sentiment).
Your FINAL output MUST be a raw JSON string with the following seven integer fields (all 10-100) and one string field. You MUST NOT include any surrounding markdown, backticks (\`\`\`), or other text outside of the raw JSON string:
{
  "rarityScore": number,
  "tld": number,
  "trend": number,
  "age": number,
  "mcap": number,
  "volume": number,
  "sentiment": number,
  "analysis": string
}`;
exports.rarityAgent = new agent_1.Agent({
    name: "Domain Rarity Agent",
    instructions,
    model: (0, google_1.google)("gemini-2.5-flash"),
    tools: { domainDataTool: domaindatatool_1.domainDataTool }
});
