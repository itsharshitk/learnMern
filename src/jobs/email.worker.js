const Worker = require("bullmq");
const Redis = require("ioredis");
const { sendMail } = require("../services/mail.service");
const config = require("../config");

const worker = new Worker(
                "emails",

                async job =>{
                    await sendMail(job.data);
                },
                
                {
                    connection: new Redis(config.redis_url)
                }
);

worker.on("completed",
    job => {
        console.log("Mail sent");
    }
);