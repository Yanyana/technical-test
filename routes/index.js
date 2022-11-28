const express = require("express");
const router = express.Router();
const itemRoute = require("./item.route")

router.use("/item", itemRoute);

module.exports = router;