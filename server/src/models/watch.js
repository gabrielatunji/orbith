const mongoose = require('mongoose');
const { Schema } = mongoose;

const WatchSchema = new Schema({
  domainName: { type: String, required: true, index: true },
  userIdentifier: { type: String }, // wallet or email
  alertType: { type: String, enum: ['anyOffer','offerGTE'], default: 'anyOffer' },
  threshold: { type: Number, default: 0 },
  lastTriggeredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Watch', WatchSchema);

