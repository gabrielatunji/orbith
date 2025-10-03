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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import domainRoutes from './src/routes/domainroutes';
// import watchRoutes from './src/routes/watchroutes';
// import inquiryRoutes from './src/routes/inquiryroutes';
const logger_1 = __importDefault(require("./src/utils/logger"));
const db_1 = __importDefault(require("./src/config/db"));
const subgraphservice_1 = require("./src/services/subgraphservice");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// // API routes
// app.use('/api/domains', domainRoutes);
// app.use('/api/watches', watchRoutes);
// app.use('/api/inquiries', inquiryRoutes);
app.get('/health', (req, res) => res.json({ ok: true }));
let server; // Specify type for server
try {
    server = app.listen(4000, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.default)();
        logger_1.default.info('Connected to database');
        // Call the test functions
        (0, subgraphservice_1.fetchSpecificDomainInfo)("collinsbuckfocused56.ai");
        //fetchLatestDomains();
        //fetchNewListings();
        (0, subgraphservice_1.fetchFractionalDomains)();
        (0, subgraphservice_1.fetchDomainTokenPrice)("software.ai");
        //await runRarityAnalysis("aiwhispers.com"); // Await the rarity analysis
        logger_1.default.info('App listening on port 4000');
    }));
    process.on('SIGINT', () => {
        logger_1.default.info('SIGINT received, shutting down');
        server.close(() => {
            logger_1.default.info('Server stopped');
            process.exit(0);
        });
    });
}
catch (err) { // Specify type for err
    logger_1.default.error('Failed to start', err);
    process.exit(1);
}
