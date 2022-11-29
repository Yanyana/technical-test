const express = require("express");
const router = express.Router();
const { success, dataNotFound } = require("../utils/response-handler");
const errorHandler = require("../utils/error-handler")
const emailController = require("../controllers/emailController");

router.get('/', async (req, res) => {
    return success(res, {}, 'email here.')
});

router.post('/', async (req, res) => {
    try {
        const {
            email,
            subject,
            text,
        } = req.body;

        const mail = await emailController.sendMail({
            email,
            subject,
            text
        });
    
        if (mail) {
            return success(res, mail, 'Item created successfully!')
        } else {
            return dataNotFound(res, mail)
        }

    } catch (err) {
        return errorHandler(err, req, res)
    }
});

module.exports = router;