"use strict";
const express = require('express');
const router = express.Router();
const domainController = require('../controllers/domainController');
router.get('/', domainController.listDomains);
router.get('/:domainName', domainController.getDomain);
router.post('/sync/:domainName', domainController.syncDomain);
module.exports = router;
