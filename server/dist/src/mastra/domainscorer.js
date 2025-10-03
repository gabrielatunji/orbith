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
exports.runRarityAnalysis = void 0;
const rarityagent_1 = require("./rarityagent");
const runRarityAnalysis = (domainName) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = `Analyze the rarity and value metrics for the ${domainName} domain collection.`;
    console.log("🔎 Running Domain Rarity Analysis...");
    console.log(`➡️  Query: "${userQuery}"`);
    try {
        const response = yield rarityagent_1.rarityAgent.generate([
            {
                role: "system",
                content: `Provide the rarity and value metrics for the ${domainName} domain collection`
            },
            {
                role: "user",
                content: userQuery
            }
        ], {
            output: rarityagent_1.analysisOutputSchema
        });
        const jsonString = response.object;
        if (!jsonString) {
            console.error("❌ No response received from agent.");
            return;
        }
        let analysisResult;
        try {
            analysisResult = JSON.parse(jsonString);
        }
        catch (parseError) {
            console.error("❌ Failed to parse agent response as JSON.", parseError);
            console.log("Raw response:", jsonString);
            return;
        }
        console.log("\n✅ Parsed Rarity Analysis Result:");
        console.table({
            "Rarity Score": analysisResult.rarityScore,
            "TLD Prestige": analysisResult.tld,
            "Market Trend": analysisResult.trend,
            "Domain Age": analysisResult.age,
            "Onchain MCAP": analysisResult.mcap,
            "Trading Volume": analysisResult.volume,
            "Market Sentiment": analysisResult.sentiment
        });
        console.log("\n📝 Objective Analysis:\n" + analysisResult.analysis);
    }
    catch (error) {
        console.error("❌ Error during agent generation:", error);
    }
});
exports.runRarityAnalysis = runRarityAnalysis;
