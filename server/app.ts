import express from 'express';
// import domainRoutes from './src/routes/domainroutes';
// import watchRoutes from './src/routes/watchroutes';
// import inquiryRoutes from './src/routes/inquiryroutes';
import logger from './src/utils/logger';
import connectDB from './src/config/db';
import { fetchSpecificDomainInfo, fetchLatestDomains, fetchNewListings, fetchDomainTokenPrice, fetchFractionalDomains} from './src/services/subgraphservice';
import { runRarityAnalysis } from './src/mastra/domainscorer';

const app = express();
app.use(express.json());

// // API routes
// app.use('/api/domains', domainRoutes);
// app.use('/api/watches', watchRoutes);
// app.use('/api/inquiries', inquiryRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

let server: any; // Specify type for server

try {
  server = app.listen(4000, async () => {
    await connectDB();
    logger.info('Connected to database');

    // Call the test functions
    fetchSpecificDomainInfo("collinsbuckfocused56.ai");
    //fetchLatestDomains();
    //fetchNewListings();
    fetchFractionalDomains();
    fetchDomainTokenPrice("software.ai");
    //await runRarityAnalysis("aiwhispers.com"); // Await the rarity analysis
    logger.info('App listening on port 4000');
  });

  process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down');
    server.close(() => {
      logger.info('Server stopped');
      process.exit(0);
    });
  });
} catch (err: any) { // Specify type for err
  logger.error('Failed to start', err);
  process.exit(1);
}