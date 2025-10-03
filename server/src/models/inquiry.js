const mongoose = require('mongoose');
const { Schema } = mongoose;

const InquirySchema = new Schema({
  domainName: { type: String, required: true, index: true },
  fromName: String,
  fromEmail: String,
  message: String,
  status: { type: String, enum: ['new','read','responded'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inquiry', InquirySchema);
