const axios = require('axios');
const logger = require('../utils/logger');
require('dotenv').config();

const POLL_URL = process.env.DOMA_POLL_API_URL;
const POLL_ACK_URL = process.env.DOMA_POLL_ACK_URL;

const EVENT_TYPES = {NAME_TOKENIZED: 'NAME_TOKENIZED'};

async function pollEvents({ limit = 10, eventTypes = [] } = {}) {
  try {
    // Log the request parameters
    logger.info('Polling events with params:', {
      url: POLL_URL,
      limit,
      eventTypes: eventTypes.join(','),
      hasApiKey: !!process.env.API_KEY
    });

    const eventTypesString = eventTypes.join(','); 
    const resp = await axios.get(POLL_URL, {
      params: {
        limit,
        eventTypes: eventTypesString,
        finalizedOnly: true
      },
      headers: {
        'Api-Key': process.env.API_KEY
      }
    });

    // Log full response for debugging
    logger.info('Poll API response status:', resp.status);
    logger.info('Poll API response data:', JSON.stringify(resp.data, null, 2));

    return resp.data || { events: [], lastId: null };
  } catch (err) {
    // Enhanced error logging
    logger.error('Poll API error:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
      config: {
        url: err.config?.url,
        params: err.config?.params,
        headers: {
          ...err.config?.headers,
          'Api-Key': '[REDACTED]'
        }
      }
    });
    return { events: [], lastId: null };
  }
}

async function acknowledge(lastEventId) {
  if (!POLL_ACK_URL) {
    logger.warn('No POLL ACK URL set; skipping ack');
    return;
  }
  try {
    const url = `${POLL_ACK_URL}/${lastEventId}`;
    await axios.post(url, null, {
      headers: { 'Api-Key': process.env.API_KEY || '' }
    });
  } catch (err) {
    logger.warn('Failed to ack event', lastEventId, err.message || err);
  }
}


// Test the pollEvents function (only in non-production environments)
  async function testPollEvents() {
    try {
      // Use Object.values to get all event types
      const events = Object.values(EVENT_TYPES);
      logger.info('Testing poll events with types:', events);
      
      const result = await pollEvents({ 
        limit: 5, 
        eventTypes: events 
      });
      
      logger.info("Poll test result:", JSON.stringify(result, null, 2));
    } catch (error) {
      logger.error("Poll test failed:", error);
    }
  }
  // Add delay before running test to ensure environment is loaded
  setTimeout(testPollEvents, 1000);

module.exports = { pollEvents, acknowledge, testPollEvents };

