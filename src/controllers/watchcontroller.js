const Watch = require('../models/watch');

exports.createWatch = async (req, res) => {
  const { domainName, userIdentifier, alertType, threshold } = req.body;
  const watch = new Watch({ domainName, userIdentifier, alertType, threshold });
  await watch.save();
  res.json(watch);
};

exports.listWatches = async (req, res) => {
  const watches = await Watch.find().limit(200);
  res.json(watches);
};

exports.deleteWatch = async (req, res) => {
  await Watch.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
