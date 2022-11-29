const express = require("express");
const router = express.Router();
const redis = require("redis");
const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
const client = redis.createClient({url});

client.on("error", (err) => {
    console.log("REDIS ERROR => "+ err);
});

client.connect();

const { success, dataNotFound } = require("../utils/response-handler");
const errorHandler = require("../utils/error-handler")
const emailController = require("../controllers/emailController");

redisQueue();

async function redisQueue(){
  const subscriber = client.duplicate();
  await subscriber.connect();

  await subscriber.subscribe('send_mail', async (message) => {
    let dataMail = JSON.parse(JSON.parse(JSON.stringify(message)));
    console.log('reading data from message queue')
    await emailController.sendMail(dataMail)
  });
}

router.post('/', async (req, res) => {
    try {
        let mail = await client.publish('send_mail', JSON.stringify(req.body));
        // 0 is not yet read redis subscribe
        if (mail >= 0) {
            return success(res, req.body, 'Message Queue')
        } else {
            return dataNotFound(res, mail)
        }

    } catch (err) {
        return errorHandler(err, req, res)
    }
});

module.exports = router;