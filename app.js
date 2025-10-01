const express = require('express');
const bodyParser = require('body-parser');
const domainRoutes = require('./src/routes/domainroutes');
const watchRoutes = require('./src/routes/watchroutes');
const inquiryRoutes = require('./src/routes/inquiryroutes');
const logger = require('./src/utils/logger');
const connectDB = require('./src/config/db');
const { testClientConnection } = require('./src/services/graphqlclient');
const {fetchSpecificDomainName} = require('./src/services/subgraphservice');

const app = express();
app.use(bodyParser.json());

// API routes
app.use('/api/domains', domainRoutes);
app.use('/api/watches', watchRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

let server;
try {
  server = app.listen(4000, async () => {
    await connectDB();
    // Call the test function and await its result
    try {
      await testClientConnection();
      await fetchSpecificDomainName("verygoodfood.com");
      logger.info('GraphQL client connection test completed');
    } catch (error) {
      logger.error('GraphQL client connection test failed:', error);
    }
    logger.info('App listening on port 4000');
  });

  process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down');
    server.close(() => {
      logger.info('Server stopped');
      process.exit(0);
    });
  });
} catch (err) {
  logger.error('Failed to start', err);
  process.exit(1);
}