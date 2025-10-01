// const FractionalDomain = require('../models/fractionaldomain');
// const ScoreHistory = require('../models/scorehistory');

// function safeNum(v) {
//   if (v == null) return 0;
//   const n = Number(v);
//   if (Number.isNaN(n)) return 0;
//   return n;
// }

// async function computeScoreFromDoc(doc) {
//   const minBuy = safeNum(doc.minBuyoutPrice);
//   const curBuy = safeNum(doc.currentBuyoutPrice);
//   const holderCount = doc.holderCount || 0;
//   const totalSupply = safeNum(doc.totalSupply);

//   const buyoutRatio = minBuy > 0 ? (curBuy / minBuy) : 1;
//   const buyoutScore = Math.max(0, Math.min(1, (buyoutRatio - 1) / (buyoutRatio + 1)));

//   const liquidityScore = Math.min(1, Math.log10(holderCount + 1) / 3);

//   const avgPerHolder = holderCount > 0 ? totalSupply / holderCount : totalSupply;
//   const concentrationPenalty = Math.min(1, Math.log10((avgPerHolder || 1) + 1) / 3);
//   const concentrationScore = 1 - concentrationPenalty;

//   const score = (buyoutScore * 0.5) + (liquidityScore * 0.35) + (concentrationScore * 0.15);

//   return {
//     score,
//     components: { buyoutScore, liquidityScore, concentrationScore }
//   };
// }

// async function computeAndSave(doc) {
//   const { score, components } = await computeScoreFromDoc(doc);

//   const hist = new ScoreHistory({
//     domain: doc._id,
//     score,
//     components,
//   });
//   await hist.save();

//   doc.metadata = doc.metadata || {};
//   doc.metadata.latestScore = score;
//   doc.metadata.latestComponents = components;
//   await doc.save();

//   return { domain: doc, score, components, hist };
// }

// module.exports = { computeScoreFromDoc, computeAndSave };

