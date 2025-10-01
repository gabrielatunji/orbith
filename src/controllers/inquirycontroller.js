const Inquiry = require('../models/inquiry');

exports.createInquiry = async (req, res) => {
  const { domainName, fromName, fromEmail, message } = req.body;
  const inquiry = new Inquiry({ domainName, fromName, fromEmail, message });
  await inquiry.save();
  // TODO: send notification (email / webhook) to domain owner
  res.json(inquiry);
};

exports.getByDomain = async (req, res) => {
  const { domainName } = req.params;
  const inquiries = await Inquiry.find({ domainName }).sort('-createdAt');
  res.json(inquiries);
};
