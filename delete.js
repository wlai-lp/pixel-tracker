const redis = require('redis');

require('dotenv').config();

// Create a Redis client
const client = redis.createClient({
    url: process.env.REDIS_URL
  });
client.connect(); // Ensure to connect when using modern `redis` library

(async () => {
  try {
    // Delete all entries in the current database
    await client.flushDb();
    console.log('All entries deleted from the current database.');

    // If you want to delete all entries across all databases:
    // await client.flushAll();
    // console.log('All entries deleted from all databases.');
  } catch (err) {
    console.error('Error clearing Redis:', err);
  } finally {
    await client.disconnect(); // Close the connection
  }
})();
