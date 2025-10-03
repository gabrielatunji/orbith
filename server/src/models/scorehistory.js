const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScoreHistorySchema = new Schema({
  domain: { type: Schema.Types.ObjectId, ref: 'FractionalDomain', required: true },
  timestamp: { type: Date, default: Date.now },
  score: { type: Number, required: true },
  components: { type: Schema.Types.Mixed },
});

module.exports = mongoose.model('ScoreHistory', ScoreHistorySchema);

