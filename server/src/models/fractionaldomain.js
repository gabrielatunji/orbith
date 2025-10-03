const mongoose = require('mongoose');
const { Schema } = mongoose;

const FractionalDomainSchema = new Schema({
  domainName: { type: String, index: true, required: true, unique: true },
  domainId: { type: String },
  fractionalTokenAddress: { type: String },
  totalSupply: { type: String },
  minBuyoutPrice: { type: String },
  currentBuyoutPrice: { type: String },
  holderCount: { type: Number, default: 0 },
  lastSyncedAt: { type: Date, default: Date.now },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.models.FractionalDomain || mongoose.model('FractionalDomain', FractionalDomainSchema);
