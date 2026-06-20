const config = require("../config");
const { Queue } = require("bullmq");
const Redis = require("ioredis");


const connection = new Redis(config.redis_url, {
    maxRetriesPerRequest: null
});

const emailQueue = new Queue("emails", {connection});

module.exports = emailQueue;