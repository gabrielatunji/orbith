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
        const RarityAnalysisResult = response.object;
        if (!RarityAnalysisResult) {
            console.error("❌ No response received from agent.");
            return;
        }
        console.log("\n✅ Parsed Rarity Analysis Result:");
        console.table({
            "Rarity Score": RarityAnalysisResult.rarityScore,
            "TLD Prestige": RarityAnalysisResult.tld,
            "Market Trend": RarityAnalysisResult.trend,
            "Domain Age": RarityAnalysisResult.age,
            "Onchain MCAP": RarityAnalysisResult.mcap,
            "Trading Volume": RarityAnalysisResult.volume,
            "Market Sentiment": RarityAnalysisResult.sentiment
        });
        console.log("\n📝 Objective Analysis:\n" + RarityAnalysisResult.analysis);
    }
    catch (error) {
        console.error("❌ Error during agent generation:", error);
    }
});
exports.runRarityAnalysis = runRarityAnalysis;
