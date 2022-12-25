const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchases');


router.get("/purchases", async(req, res) => {
    const purchase = await Purchase.find().exec();
    console.log(purchase)
    res.status(200).json({ purchase });
});

router.post('/purchases', async(req, res) => {
    const { purchase } = req.body;
    const { name, description, cost, method } = purchase;
    if (!name || !description || !cost || !method) {
        res.status(400).json({ error: 'Invalid Input!' });
    } else {
        const newPurchase = await Purchase.create(purchase);
        res.status(200).json({ newPurchase });
    }
});

router.delete('/purchases', async(req, res) => {
    const purchase = await Purchase.find().exec();
    console.log(req.params._id)
    console.log(res)
    Purchase.findByIdAndRemove(req.params._id, function(err, docs) {
        console.log(docs)
        if (err) {
            console.log(err)
        } else {

            console.log("Item Removed");
        }
    });
    console.log(purchase)
    res.status(200).json({ purchase });
});


module.exports = router;