const express = require("express");
const router = express.Router();
const itemRoute = require("./item.route")
const emailRoute = require("./email.route")

router.use("/item", itemRoute);
router.use("/email", emailRoute);

module.exports = router;