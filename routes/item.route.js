const express = require("express");
const router = express.Router();
const { success, dataNotFound } = require("../utils/response-handler");
const errorHandler = require("../utils/error-handler")
const itemController = require('../controllers/itemController');

router.get('/:hash', async (req, res) => {
    try {
        const { hash } = req.params
  
        const item = await itemController.readItem(hash);
    
        if (item) {
            return success(res, item, 'Item read successfully!')
        } else {
            return dataNotFound(res, {})
        }

    } catch (err) {
        console.log(err)
        return errorHandler(err, req, res)
    }
});

router.get('/', async (req, res) => {
    try {
        const item = await itemController.readItems();
    
        if (item.length > 0) {
            return success(res, item, 'Item read successfully!')
        } else {
            return dataNotFound(res, item)
        }

    } catch (err) {
        console.log(err)
        return errorHandler(err, req, res)
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            name,
            rating,
            price,
            hash
        } = req.body;

        const item = await itemController.createItem({
            name,
            rating,
            price,
            hash
        });
    
        if (item) {
            return success(res, item, 'Item created successfully!')
        } else {
            return dataNotFound(res, item)
        }

    } catch (err) {
        console.log(err)
        return errorHandler(err, req, res)
    }
});

router.put('/:hash', async (req, res) => {
    try {
        const {
            name,
            rating,
            price,
        } = req.body;

        const { hash } = req.params

        const item = await itemController.updateItem({
            name,
            rating,
            price,
            hash
        });
    
        if (item) {
            return success(res, item, 'Item created successfully!')
        } else {
            return dataNotFound(res, item)
        }

    } catch (err) {
        console.log(err)
        return errorHandler(err, req, res)
    }
});

router.delete('/:hash', async (req, res) => {
    try {
        const { hash } = req.params

        const item = await itemController.deleteItem({
            hash
        });
    
        if (item) {
            return success(res, item, 'Item created successfully!')
        } else {
            return dataNotFound(res, item)
        }

    } catch (err) {
        console.log(err)
        return errorHandler(err, req, res)
    }
});


module.exports = router;