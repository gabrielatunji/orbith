"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const FractionalDomain = require('../models/fractionaldomain');
const scoringService = require('../services/scoringService');
exports.listDomains = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 20, sort = '-createdAt' } = req.query;
    const domains = yield FractionalDomain.find()
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(Number(limit));
    res.json(domains);
});
exports.getDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domainName } = req.params;
    const domain = yield FractionalDomain.findOne({ domainName });
    if (!domain)
        return res.status(404).json({ error: 'Not found' });
    res.json(domain);
});
exports.syncDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domainName } = req.params;
    try {
        const doc = yield subgraphService.fetchFractionalDomain(domainName);
        if (!doc)
            return res.status(404).json({ error: 'Not found on subgraph' });
        const result = yield scoringService.computeAndSave(doc);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'sync failed' });
    }
});
