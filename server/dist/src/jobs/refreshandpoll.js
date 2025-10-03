"use strict";
// const cron = require('node-cron');
// const subgraphService = require('../services/subgraphService');
// const scoringService = require('../services/scoringService');
// const pollService = require('../services/pollservice');
// const logger = require('../utils/logger');
Object.defineProperty(exports, "__esModule", { value: true });
// const POLL_INTERVAL = Number(process.env.POLL_INTERVAL_SECONDS || 60);
// async function runRefresh() {
//   logger.info('Running refresh job: sync fractional domains');
//   try {
//     const domains = await subgraphService.listFractionalDomains({ limit: 100, skip: 0 });
//     for (const item of domains) {
//       const doc = await subgraphService.fetchFractionalDomain(item.domainName);
//       if (doc) {
//         await scoringService.computeAndSave(doc);
//       }
//     }
//     logger.info(`Refreshed ${domains.length} domains`);
//   } catch (err) {
//     logger.error('Refresh error', err);
//   }
// }
// async function runPoll() {
//   logger.info('Polling events from Doma Poll API');
//   try {
//     const { events, lastId } = await pollService.pollEvents({ limit: 20, eventTypes: [] });
//     if (events && events.length > 0) {
//       logger.info(`Received ${events.length} events, lastId = ${lastId}`);
//       for (const ev of events) {
//         // Example: if event is fractionalization or buyout, sync domain
//         const domainName = ev.name;
//         if (domainName) {
//           await subgraphService.fetchFractionalDomain(domainName)
//             .then(doc => {
//               if (doc) return scoringService.computeAndSave(doc);
//             })
//             .catch(err => logger.warn('Error on event sync', domainName, err));
//         }
//       }
//       // Acknowledge
//       if (lastId != null) {
//         await pollService.acknowledge(lastId);
//       }
//     }
//   } catch (err) {
//     logger.error('Poll run failed', err);
//   }
// }
// async function start() {
//   // run immediately
//   await runRefresh();
//   await runPoll();
//   // schedule both tasks
//   cron.schedule(`*/${POLL_INTERVAL} * * * * *`, async () => {
//     await runRefresh();
//     await runPoll();
//   });
// }
// module.exports = { start };
