const express = require("express");
const router = express.Router();
const { success, dataNotFound } = require("../utils/response-handler");
const errorHandler = require("../utils/error-handler")

router.get('/:hash', async (req, res) => {
    try {
        const {
            hash
        } = req.params;
  
        const item = [];
    
        if (item.length > 0) {
            return success(res, item, 'Item read successfully!')
        } else {
            return dataNotFound(res, item)
        }

    } catch (err) {
        console.log(err)
        return errorHandler(err, req, res, next)
    }
});


module.exports = router;