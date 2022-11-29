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
    
        let item = new Item({
            name,
            rating,
            price,
            hash
        });
    
        return await item.save();
    } catch (err) {
        console.log(err)
        return Promise.reject(err);
    }
}

exports.makeid = async function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}