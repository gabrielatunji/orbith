const FractionalDomain = require('../models/fractionaldomain');
const scoringService = require('../services/scoringService');

exports.listDomains = async (req, res) => {
  const { page = 1, limit = 20, sort = '-createdAt' } = req.query;
  const domains = await FractionalDomain.find()
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(domains);
};

exports.getDomain = async (req, res) => {
  const { domainName } = req.params;
  const domain = await FractionalDomain.findOne({ domainName });
  if (!domain) return res.status(404).json({ error: 'Not found' });
  res.json(domain);
};

exports.syncDomain = async (req, res) => {
  const { domainName } = req.params;
  try {
    const doc = await subgraphService.fetchFractionalDomain(domainName);
    if (!doc) return res.status(404).json({ error: 'Not found on subgraph' });
    const result = await scoringService.computeAndSave(doc);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'sync failed' });
  }
};
