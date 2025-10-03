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
const Watch = require('../models/watch');
exports.createWatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domainName, userIdentifier, alertType, threshold } = req.body;
    const watch = new Watch({ domainName, userIdentifier, alertType, threshold });
    yield watch.save();
    res.json(watch);
});
exports.listWatches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const watches = yield Watch.find().limit(200);
    res.json(watches);
});
exports.deleteWatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Watch.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
});
