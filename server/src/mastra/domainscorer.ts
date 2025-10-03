import { analysisOutputSchema, rarityAgent } from "./rarityagent";

interface RarityAnalysisResult {
  rarityScore: number;
  tld: number;
  trend: number;
  age: number;
  mcap: number;
  volume: number;
  sentiment: number;
  analysis: string;
}

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

    const jsonString = response.object;

    if (!jsonString) {
      console.error("❌ No response received from agent.");
      return;
    }

    let analysisResult: RarityAnalysisResult;
    try {
      analysisResult = JSON.parse(jsonString) as RarityAnalysisResult;
    } catch (parseError) {
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

  } catch (error) {
    console.error("❌ Error during agent generation:", error);
  }
};