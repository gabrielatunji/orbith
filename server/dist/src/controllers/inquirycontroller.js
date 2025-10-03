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
const Inquiry = require('../models/inquiry');
exports.createInquiry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domainName, fromName, fromEmail, message } = req.body;
    const inquiry = new Inquiry({ domainName, fromName, fromEmail, message });
    yield inquiry.save();
    // TODO: send notification (email / webhook) to domain owner
    res.json(inquiry);
});
exports.getByDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domainName } = req.params;
    const inquiries = yield Inquiry.find({ domainName }).sort('-createdAt');
    res.json(inquiries);
});
