const Item = require('../models/item.model');
const { success, dataNotFound } = require("../utils/response-handler");

exports.readItem = async function (hash) {
    try {
      if (!hash) {
        throw new Error('Invalid item id');
      }
  
      return await Item.findOne({
        hash
      });
    } catch (err) {
      return Promise.reject(err);
    }
};

exports.readItems = async function (hash) {
    try {
  
      return await Item.find();

    } catch (err) {
      return Promise.reject(err);
    }
};

exports.createItem = async function (itemObj) {
    if (!itemObj || !itemObj.name || !itemObj.rating || !itemObj.price || !itemObj.hash) {
        throw new Error('Invalid arguments');
    }

    try {
        
        const {
            name,
            rating,
            price,
            hash
        } = itemObj;
    
        let item = Item.findOneAndUpdate(hash, {
            name,
            rating,
            price
        }, {
            returnOriginal: false
        });
    
        return item
    } catch (err) {
        console.log(err)
        return Promise.reject(err);
    }
}

exports.updateItem = async function (itemObj) {
    if (!itemObj || !itemObj.name || !itemObj.rating || !itemObj.price || !itemObj.hash) {
        throw new Error('Invalid arguments');
    }
}

exports.makeid = async function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    let checkItem = await Item.findOne({
        hash: result
    });

    if (!checkItem) {
        return result;
    } else {
        this.makeid(10);
    }
}