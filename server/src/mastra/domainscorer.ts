import { analysisOutputSchema, rarityAgent } from "./rarityagent";


export const runRarityAnalysis = async (domainName: string) => {
  const userQuery = `Analyze the rarity and value metrics for the ${domainName} domain collection.`;
  console.log("🔎 Running Domain Rarity Analysis...");
  console.log(`➡️  Query: "${userQuery}"`);

  try {
    const response = await rarityAgent.generate(
      [
        {
          role: "system",
          content: `Provide the rarity and value metrics for the ${domainName} domain collection`
        },
        {
          role: "user",
          content: userQuery
        }
      ],
      {
        output: analysisOutputSchema
      }
    );

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

  } catch (error) {
    console.error("❌ Error during agent generation:", error);
  }
};